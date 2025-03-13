import { React, useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Components/Sidebar";
import AddCart from "./Pages/AddCart";
import ListCart from "./Pages/ListCart";
import Order from "./Pages/Order";
import Navbar from "./Components/Navbar";
import { AnimatePresence } from "framer-motion";
import Menubar from "./Components/Menubar";

function App() {
  let menuRef = useRef();
  const [MenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!MenuOpen);
  };
  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <>
      <AnimatePresence mode="wait">
        <BrowserRouter>
          <ToastContainer />
          <div className="flex">
            <Sidebar />
            <div className="flex w-full flex-col">
              <Menubar
                ref={menuRef}
                toggleMenu={toggleMenu}
                MenuOpen={MenuOpen}
              />
              <Navbar setMenuOpen={setMenuOpen} toggleMenu={toggleMenu} />
              <Routes>
                <Route path="/" element={<AddCart />} />
                <Route path="/list" element={<ListCart />} />
                <Route path="/order" element={<Order />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </AnimatePresence>
    </>
  );
}

export default App;
