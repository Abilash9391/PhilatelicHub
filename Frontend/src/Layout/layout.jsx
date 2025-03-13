import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer";
const Layout = ({ children, theme, setTheme, activeTab, setActiveTab }) => {
  return (
    <div>
      <Navbar
        theme={theme}
        setTheme={setTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {children}
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Layout;
