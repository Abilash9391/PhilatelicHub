import { React, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./Authentication/store/reducer/auth";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages/HomePage";
import NewCollection from "./Pages/NewCollection";
import Product from "./Pages/Product";
import ProductDetails from "./Pages/ProductDetails";
import SignUp from "./Pages/SignUp";
import VerifyProducts from "./Pages/VerifyProducts";
import Login from "./Pages/Login";
// import UserProfile from "./Pages/Profile";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import Verify from "./Pages/Verify";
import Community from "./Pages/Community";
import UserOrders from "./Pages/UserOrders";
import New from "./Pages/New";
import Sell from "./Pages/Sell";
import Education from "./Pages/Education";
import Layout from "./Layout/layout";
import OrderConfirmation from "./Pages/OrderConfirmation";
import PaymentCancelled from "./Pages/PaymentCancelled";
import ProtectedRoutes from "./Authentication/ProtectedRoutes";
import AuthenticatedRoutes from "./Authentication/AuthenticatedRoutes";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  const navbar = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "New Collection", link: "/newcollection" },
    { id: 3, name: "Product", link: "/product" },
  ];
  const [activeTab, setActiveTab] = useState(navbar[0].id);

  return (
    <>
      <AnimatePresence mode="wait">
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route element={<AuthenticatedRoutes />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/order" element={<Order />} />
              <Route
                path="/myorders"
                element={
                  <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                    <UserOrders />
                  </Layout>
                }
              />
            </Route>
                <Route path="/verify" element={<Verify />} />
            <Route
              path="/"
              element={
                <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                  <HomePage activeTab={activeTab} setActiveTab={setActiveTab} />
                </Layout>
              }
            />
            <Route
              path="/product"
              element={
                <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                  <Product />
                </Layout>
              }
            />
            <Route
              path="/product/:name"
              element={
                <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                  <ProductDetails />
                </Layout>
              }
            />
            <Route
              path="/userproducts/:id"
              element={<VerifyProducts/>}/>
            <Route
              path="/newcollection"
              element={
                <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                  <NewCollection />
                </Layout>
              }
            />
            <Route
              path="/cart"
              element={
                <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                  <Cart />
                </Layout>
              }
            />
            <Route
              path="/addproduct"
              element={
                <New/>
              }
            />
            <Route
              path="/sell"
              element={
                <Sell/>
              }
              />
            <Route
              path="/community"
              element={
                <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                  <Community />
                </Layout>
              }
            />
            <Route
              path="/education"
              element={
                <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                  <Education />
                </Layout>
              }
            />
            {/* <Route path="/profile" element={<UserProfile/>}/> */}
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/payment-cancelled" element={<PaymentCancelled />} />
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </>
  );
}

export default App;
