"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
const Verify = () => {
  const navigate = useNavigate()
  // const [searchParams, setSearchParams] = useSearchParams();
  // const success = searchParams.get("success");
  // const orderId = searchParams.get("orderId");

  const success = localStorage.getItem("success")
  const orderId = localStorage.getItem("orderId")
  const paypalOrderId = localStorage.getItem("paypalOrderId")
  const [isLoading, setIsLoading] = useState(false)
  const URL = "http://localhost:3000"

  const verifyPayment = async () => {
    setIsLoading(true)
    try {
      console.log("Verifying payment with:", {
        paypalOrderId,
        success,
        orderId,
      })

      const response = await axios.post(`${URL}/api/order/verify`, {
        paypalOrderId,
        success,
        orderId,
      })

      console.log("Verification response:", response.data)

      if (response.data.success) {
        setIsLoading(false)
        // Clear localStorage items after successful verification
        // localStorage.removeItem("paypalOrderId")
        // localStorage.removeItem("orderId")
        localStorage.removeItem("success")

        toast.success(response.data.message)
        navigate("/order-confirmation")
      } else {
        setIsLoading(false)
        toast.error(response.data.message)
        navigate("/payment-cancelled")
      }
    } catch (error) {
      console.error("Payment verification error:", error)
      setIsLoading(false)
      toast.error("Payment verification failed. Please contact support.")
      navigate("/payment-cancelled")
    }
  }
  useEffect(() => {
    verifyPayment()
  }, [paypalOrderId, orderId, success])
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="h-24 w-24 animate-spin rounded-full border-4 border-t-primary" />
        <p className="mt-4 text-white text-xl">Processing your payment...</p>
      </div>
    )
  }
  return (
    <section>
      <div className="grid min-h-[60vh]">
        <div className="h-24 w-24 animate-spin place-self-center rounded-full border-4 border-t-primary" />
      </div>
    </section>
  )
}

export default Verify




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate, useSearchParams } from "react-router-dom";
// const Verify = () => {
//   const navigate = useNavigate();
//   // const [searchParams, setSearchParams] = useSearchParams();
//   // const success = searchParams.get("success");
//   // const orderId = searchParams.get("orderId");
  
//   const success=localStorage.getItem('success');
//   const orderId=localStorage.getItem('orderId');
//   const paypalOrderId=localStorage.getItem('paypalOrderId');
//   const [isLoading,setIsLoading] =useState(false);
//   const URL = "http://localhost:3000";

//   const verifyPayment = async () => {
//     setIsLoading(true);
//     console.log(orderId);
//     console.log(paypalOrderId);
//     console.log(success);
//     try {
//     let response = await axios.post(`${URL}/api/order/verify`, {
//       paypalOrderId,
//       success,
//       orderId,
//     });
//     if (response.data.success) {
//       // navigate("/myorders");
//       setIsLoading(false);
//       navigate('/order-confirmation');
//       toast.success(response.data.message);
//     } else {
//       setIsLoading(false);
//       navigate('/payment-cancelled');
//       toast.error(response.data.message);
//     }
//     localStorage.removeItem('paypalOrderId');
//   }
//   catch (error) {
//     console.log(error);
//   }
//   };
//   useEffect(() => {
//     verifyPayment();
//   }, [paypalOrderId,orderId, success]);
//   if(isLoading)
// {
//   return <div>Processing Payment...</div>;
// }  return (
//     <section>
//       <div className="grid min-h-[60vh]">
//         <div className="h-24 w-24 animate-spin place-self-center rounded-full border-4 border-t-primary" />

//       </div>
//     </section>
//   );
// };

// export default Verify;
