import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";

const Footer = ({ activeTab, setActiveTab }) => {
  const navbar = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "New Collection", link: "/newcollection" },
    { id: 3, name: "Product", link: "/product" },
  ];
  return (
    <div className="bg-background">
      <hr className="w-full border border-tetiary"></hr>
      <div className="container grid grid-cols-1 py-8 lg:grid-cols-3">
        <div>
          <img className="h-10 w-10 lg:h-40 lg:w-40" src={Logo} />
        </div>
        <div className="flex flex-row justify-evenly gap-10 pb-4 font-raleway text-xl font-semibold text-tetiary lg:justify-center">
          <h1 className="hover:text-white">
            <NavLink
              to="/newcollection"
              onClick={() => setActiveTab(navbar[1].id)}
            >
              New Collection
            </NavLink>
          </h1>
          <h1 className="hover:text-white">
            <NavLink to="/product" onClick={() => setActiveTab(navbar[2].id)}>
              Products
            </NavLink>
          </h1>
          <h1 className="hover:text-white">
            <NavLink>About Us</NavLink>
          </h1>
        </div>
        <div className="flex flex-row justify-between font-raleway font-semibold text-tetiary lg:flex-col lg:items-center lg:justify-center lg:gap-y-10">
          <div>
            <h1 className="text-2xl">Our Information</h1>
            <p>Lb nagar,Hyderabad</p>
            <p>Telangana-096</p>
          </div>

          <div className="flex flex-row gap-5 text-2xl text-white">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
