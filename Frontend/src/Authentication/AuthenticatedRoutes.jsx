import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
import { toast } from "react-toastify";
const ProtectedRoutes = () => {
  const { token } = useContext(ProductContext);
  if (token === null) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
