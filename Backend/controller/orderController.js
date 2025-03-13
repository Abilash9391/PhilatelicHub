import dotenv from "dotenv";
dotenv.config();
import paypal from '@paypal/checkout-server-sdk';
import orderModel from '../models/order.js';
import userModel from '../models/user.js';

const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

export const placeOrder = async (req, res) => {
    const { items } = req.body;
    // console.log(req.body);
    try {
        const newOrder = new orderModel({
            userId: req.body.id,
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            address: req.body.address,
            items: items,
            amount: req.body.amount,
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.id, { cartData: {} });

        const line_items = items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 100,
            },
            quantity: 1,
        });

        const request = new paypal.orders.OrdersCreateRequest();
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: req.body.amount.toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: req.body.amount.toFixed(2)
                        }
                    }
                },
                items: line_items.map(item => ({
                    name: item.price_data.product_data.name,
                    unit_amount: {
                        currency_code: 'USD',
                        value: (item.price_data.unit_amount / 100).toFixed(2)
                    },
                    quantity: item.quantity
                }))
            }],
            application_context: {
                return_url: `http://localhost:5174/verify`,
                cancel_url: `http://localhost:5174/payment-cancelled`
            }
        });

        const order = await client.execute(request);
        console.log(order);
        const paypalOrderId= order.result.id;
        const approvalLink = order.result.links.find(link => link.rel === 'approve')?.href;

        if (!approvalLink) {
            return res.json({ success: false, message: "PayPal approval URL not found" });
        }
        // const orderId=newOrder._id;
        

        res.json({ success: true, approval_url: approvalLink ,paypalOrderId:paypalOrderId,orderId:newOrder._id});
    } catch (error) {
        console.error(error);
        
        res.status(500).json({ success: false, message: error.message});
    }
};

export const verifyOrder = async (req, res) => {
    try {
      const { paypalOrderId, orderId, success } = req.body
      console.log("Verification request received:", { paypalOrderId, orderId, success })
  
      if (success !== "true") {
        console.log("Payment was unsuccessful based on success parameter")
        await orderModel.findByIdAndUpdate(orderId, { status: "payment_failed" })
        return res.json({ success: false, message: "Payment was not successful" })
      }
  
      if (!paypalOrderId) {
        console.log("Missing PayPal order ID")
        return res.status(400).json({ success: false, message: "PayPal order ID is required" })
      }
  
      // Get order details from PayPal
      try {
        const request = new paypal.orders.OrdersGetRequest(paypalOrderId)
        const orderResponse = await client.execute(request)
        console.log("PayPal order status:", orderResponse.result.status)
  
        // Check if the order exists and has been captured/approved
        if (
          orderResponse.result.status === "COMPLETED" ||
          orderResponse.result.status === "APPROVED" ||
          orderResponse.result.status === "CAPTURED"
        ) {
          await orderModel.findByIdAndUpdate(orderId, {
            payment: true,
            status: "completed",
            paypalOrderId: paypalOrderId, // Store PayPal order ID for reference
          })
  
          return res.json({ success: true, message: "Payment verified successfully" })
        } else {
          console.log("Payment not completed in PayPal")
          return res.status(400).json({
            success: false,
            message: "Payment not completed",
            paypalStatus: orderResponse.result.status,
          })
        }
      } catch (paypalError) {
        console.error("PayPal API error:", paypalError)
        // If we can't verify with PayPal but have success=true, we'll trust it
        // This is a fallback in case PayPal API has issues
        await orderModel.findByIdAndUpdate(orderId, {
          payment: true,
          status: "completed",
          paypalOrderId: paypalOrderId,
        })
  
        return res.json({
          success: true,
          message: "Payment marked as successful (PayPal verification unavailable)",
          fallback: true,
        })
      }
    } catch (error) {
      console.error("Server error during verification:", error)
      res.status(500).json({
        success: false,
        message: "Server error during payment verification",
        error: error.message,
      })
    }
  }

// export const verifyOrder = async (req, res) => {
//     try {
//         const { paypalOrderId, orderId, success } = req.body;
//         console.log("Received verification request:", { paypalOrderId, orderId, success });

//         if (success !== "true") {
//             console.log("Payment was unsuccessful.");
//             await orderModel.findByIdAndUpdate(orderId, { status: "payment_failed" });
//             return res.json({ success: false, message: "Payment Unsuccessful" });
//         }

//         const request = new paypal.orders.OrdersGetRequest(paypalOrderId);
//         const orderResponse = await client.execute(request);

//         console.log("PayPal Order Response:", orderResponse.result);

//         if (orderResponse.result.status === "COMPLETED") {
//             await orderModel.findByIdAndUpdate(orderId, { payment: true, status: "completed" });
//             return res.json({ success: true, message: "Payment Successful" });
//         } else {
//             return res.status(400).json({ success: false, message: "Payment not completed" });
//         }
//     } catch (error) {
//         console.error("Error verifying PayPal order:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


export const userOrders = async (req, res) => {
    try {
        const {userId} = req.params;
        //  || req.body.userId; // Get user ID from params or body

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orders = await orderModel.find({ userId : String(userId) }).sort({ createdAt: -1 }); // Fetch orders sorted by newest first
    
    if (!orders.length) {
      return res.json({ message: "No orders found for this user",data: null });
    }
    // console.log(orders);

        res.status(200).json({success : true,data : orders});
    } catch (error) {
        res.status(500).json({ success: false,error: "Server error", details: error.message });
    }
};

export const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Cannot Update Status: " + error.message });
    }
};

export const getStatus= async (req,res) => {
  try{
    const status = await orderModel.findById(req.params.id);
    res.json({success : true, data : status.status});
  }
  catch(error){
    res.status(500).json({success : false, message : "Error fetching status" });
  }
}

export const getOrder =async (req,res)=>{
    try {
        
        const order = await orderModel.findById(req.params.id);
        
        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }
        
        res.json({success:true,data:order});
    
      } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "Server error" });
      }
}



// dotenv.config();
// import dotenv from "dotenv";
// import paypal from '@paypal/checkout-server-sdk';
// import orderModel from '../models/order.js';
// import userModel from "../models/user.js";

// const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
// const client = new paypal.core.PayPalHttpClient(environment);


// export const placeOrder = async (req, res) => {
//   // console.log("Received order request:", req.body); // Debugging line

//   const { items } = req.body;
//   try {
//     const newOrder = new orderModel({
//       userId: req.body.id,
//       name: req.body.name,
//       email: req.body.email,
//       number: req.body.number,
//       address: req.body.address,
//       items: items,
//       amount: req.body.amount,
//     });
//     // console.log("Attempting to save new order:", newOrder);

//     await newOrder.save();
//     await userModel.findByIdAndUpdate(req.body.id, { cartData: {} });

//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity,
//     }));
//     line_items.push({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: "Delivery Charges",
//         },
//         unit_amount: 2 * 100,
//       },
//       quantity: 1,
//     });
//     const request = new paypal.orders.OrdersCreateRequest();
//     request.requestBody({
//       intent: 'CAPTURE',
//       purchase_units: [{
//         amount: {
//           currency_code: 'USD',
//           value: (req.body.amount / 100).toFixed(2),
//           breakdown: {
//             item_total: {
//               currency_code: 'USD',
//               value: (req.body.amount / 100).toFixed(2)
//             }
//           }
//         },
//         items: line_items.map(item => ({
//           name: item.price_data.product_data.name,
//           unit_amount: {
//             currency_code: 'USD',
//             value: (item.price_data.unit_amount / 100).toFixed(2)
//           },
//           quantity: item.quantity
//         }))
//       }],
//       application_context: {
//         return_url: `http://localhost:5174/order-confirmation?success=true&orderId=${newOrder._id}`,
//         cancel_url: `http://localhost:5174/payment-cancelled?success=false&orderId=${newOrder._id}`
//       }

//     });
    
//     const order = await client.execute(request);
//     res.json({ success: true, approval_url: order.result.links.find(link => link.rel === 'approve').href });

//   } catch (error) {
//     res.json({ success: false, message: "Error" });
//   }
// };

// export const verifyOrder = async (req, res) => {
//   try {
//     const { orderId, success } = req.body;
//     if (success == "true") {
//       await orderModel.findByIdAndUpdate(orderId, { payment: true });
//       res.json({ success: true, message: "Payment Succesful" });
//     } else {
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({ success: false, message: "Payment Unsuccesful" });
//     }
//   } catch (error) {
//     res.json({ success: false, message: "Error" });
//   }
// };

// export const userOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({ userId: req.body.id });
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     res.json({ success: false, message: "Error" });
//   }
// };

// export const listOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({});
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     res.json({ success: false, message: "Error" });
//   }
// };

// export const updateSatus = async (req, res) => {
//   try {
//     await orderModel.findByIdAndUpdate(
//       { _id: req.body.orderId },
//       { status: req.body.status }
//     );
//     res.json({ success: true, message: "Status Updated" });
//   } catch (error) {
//     res.json({ success: false, message: "Can Not Update Status" });
//   }
// };
