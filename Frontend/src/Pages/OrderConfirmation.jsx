"use client"

import { useEffect, useState, useContext } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { ProductContext } from "../Context/ProductContext"
import axios from "axios"
import ButtonGreen from "../Components/Button/ButtonGreen"
import { toast } from "react-toastify"

const OrderConfirmation = () => {
  // const { orderId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams()
  // const success = searchParams.get("success");
  // const orderId = searchParams.get("orderId");
  const orderId = localStorage.getItem("orderId")
  const { URL, token } = useContext(ProductContext)
  const [order, setOrder] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) {
          console.log("No order ID found")
          return
        }

        console.log("Fetching order with ID:", orderId)
        const response = await axios.get(`${URL}/api/order/${orderId}`, {
          headers: { token },
        })

        if (response.data.success) {
          console.log("Order data fetched successfully:", response.data.data)
          setOrder(response.data.data)
        } else {
          console.error("Error fetching order:", response.data.message)
          toast.error("Could not load order details")
        }
      } catch (error) {
        console.error("Error fetching order:", error)
        toast.error("Failed to load order details")
      }
    }

    fetchOrder()
  }, [orderId, URL, token])
  const toHome=()=>{
    navigate("/product");
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-primary mx-auto"></div>
          <p className="mt-4 text-white">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-white">
      <div className="bg-secondary p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-4">Order Confirmed! 🎉</h1>
        <p className="text-center text-lg mb-4">Thank you for your purchase, {order.name}!</p>
        <p className="text-center text-lg mb-4">Order ID: {orderId}</p> // Displaying order ID for debugging
        <div className="bg-accent p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Order Details</h2>
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Phone:</strong> {order.number}
          </p>
          <p>
            <strong>Shipping Address:</strong> {order.address.street}, {order.address.city}, {order.address.country} -{" "}
            {order.address.zipcode}
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Items Ordered</h2>
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-gray-600">
              <p>
                {item.name} (x{item.quantity})
              </p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-xl font-bold">
          <p>Total:</p>
          <p>${order.amount.toFixed(2)}</p>
        </div>
        <div className="mt-6 flex justify-center">
          <ButtonGreen
            onClick={toHome}
            Text_Color={"white"}
            Font={"raleway"}
            Padding_Y={"10px"}
            Padding_X={"32px"}
            Text={"Continue Shopping"}
          />
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation



// import { useEffect, useState, useContext } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { ProductContext } from "../Context/ProductContext";
// import axios from "axios";
// import ButtonGreen from "../Components/Button/ButtonGreen";

// const OrderConfirmation = () => {
//   // const { orderId } = useParams();
//   const [searchParams, setSearchParams] = useSearchParams();
//   // const success = searchParams.get("success");
//   // const orderId = searchParams.get("orderId");
//   const orderId=localStorage.getItem('orderId');
//   const { URL, token } = useContext(ProductContext);
//   const [order, setOrder] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         console.log("Fetching order with ID:", orderId); // Debugging line
//         const response = await axios.get(`${URL}/api/order/${orderId}`, {

//           headers: { token },
//         });
//         if(response.data.success){
//         console.log("Order data fetched:", response.data.data);

//           setOrder(response.data.data);
//         }
//         else{
//         console.error("Error fetching order:", response.data.message);

//         }
//       } catch (error) {
//         console.error("Error fetching order:", error);
//       }
//     };

//     if (orderId) fetchOrder();
//   }, [orderId, URL, token]);


  
//   if (!order) {
//     return (
//       <div className="flex min-h-screen items-center justify-center text-black">
//         <p>Loading order details...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-white">
//       <div className="bg-secondary p-6 rounded-lg shadow-lg w-full max-w-2xl">
//         <h1 className="text-3xl font-bold text-center mb-4">Order Confirmed! 🎉</h1>
//         <p className="text-center text-lg mb-4">Thank you for your purchase, {order.name}!</p>
//         <p className="text-center text-lg mb-4">Order ID: {orderId}</p> // Displaying order ID for debugging


//         <div className="bg-accent p-4 rounded-lg">
//           <h2 className="text-xl font-semibold">Order Details</h2>
//           <p><strong>Order ID:</strong> {order._id}</p>
//           <p><strong>Email:</strong> {order.email}</p>
//           <p><strong>Phone:</strong> {order.number}</p>
//           <p><strong>Shipping Address:</strong> {order.address.street}, {order.address.city}, {order.address.country} - {order.address.zipcode}</p>
//         </div>

//         <div className="mt-4">
//           <h2 className="text-xl font-semibold">Items Ordered</h2>
//           {order.items.map((item, index) => (
//             <div key={index} className="flex justify-between py-2 border-b border-gray-600">
//               <p>{item.name} (x{item.quantity})</p>
//               <p>${(item.price * item.quantity).toFixed(2)}</p>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-between mt-4 text-xl font-bold">
//           <p>Total:</p>
//           <p>${order.totalAmount}</p>
//         </div>

//         <div className="mt-6 flex justify-center">
//           <ButtonGreen
//             onClick={() => navigate("/product")}
//             Text_Color={"white"}
//             Font={"raleway"}
//             Padding_Y={"10px"}
//             Padding_X={"32px"}
//             Text={"Continue Shopping"}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmation;
