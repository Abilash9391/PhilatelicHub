import React from "react";
import OrderItem from "./OrderItem";

const OrderCard=({
    orderId,
    orderDate,
    items,
    status,
    // paymentMethod,
    totalAmount,
  })=> {
    return (
      <div className="bg-white rounded-md shadow-sm p-6 m-3 ">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700">Order</span>
            <span className="text-blue-500 font-medium">{orderId}</span>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <span className="text-gray-500 text-sm">Order Placed: {orderDate}</span>
            <button className="bg-orange-500 hover:bg-orange-600 text-black rounded-full px-6">TRACK ORDER</button>
          </div>
        </div>
  
        <div className="space-y-6">
          {items.map((item, index) => (
            <OrderItem key={index}
            image={item.imageFile}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            status={status}
            deliveryDate={orderDate}
              />
          ))}
        </div>
  
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 pt-4 border-t border-gray-100 gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <button className="text-gray-500 text-sm flex items-center">
              <span className="mr-2">×</span>
              CANCEL ORDER
            </button>
            {/* <span className="text-gray-400 text-sm md:ml-6 mt-2 md:mt-0">Paid using {paymentMethod}</span> */}
          </div>
          <div className="font-medium text-lg">${totalAmount.toLocaleString()}</div>
        </div>
      </div>
    );
  }

  export default OrderCard;