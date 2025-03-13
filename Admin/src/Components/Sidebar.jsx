import React from "react";
import { useState } from "react";
import { motion, spring } from "framer-motion";
import { NavLink } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { BiChevronLeft } from "react-icons/bi";
import { GiWatch } from "react-icons/gi";
import { FaList, FaBorderAll } from "react-icons/fa";

const Sidebar = () => {
  const sidebar = [
    { id: 1, name: "Add Product", link: "/", icon: IoMdAdd },
    { id: 2, name: "List Product", link: "/list", icon: FaList },
    { id: 3, name: "Orders", link: "/order", icon: FaBorderAll },
  ];
  const [activeTab, setActiveTab] = useState(sidebar[0].id);
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <div className="sticky left-0 top-0 hidden md:block">
        <div
          className={`${
            toggle ? "w-16" : "w-44"
          } relative h-full min-h-screen border-r-2 border-solid border-tetiary bg-background pr-4 pt-4 transition-all duration-500`}
        >
          <div className="hidden md:block">
            <div
              className="absolute -right-5 top-7 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary"
              onClick={() => setToggle(!toggle)}
            >
              <BiChevronLeft
                className={`${
                  toggle ? "rotate-180" : ""
                } text-3xl text-white transition-all duration-300`}
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-y-4 pt-20">
              {sidebar.map((sidebar) => (
                <NavLink key={sidebar.id} to={sidebar.link}>
                  <div
                    onClick={() => setActiveTab(sidebar.id)}
                    className={`relative mt-2 flex h-14 cursor-pointer items-center justify-center gap-x-4 rounded-r-full`}
                  >
                    {activeTab === sidebar.id && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-primary"
                        transition={{ type: spring, duration: 0.8 }}
                        style={{
                          borderTopRightRadius: "9999px",
                          borderBottomRightRadius: "9999px",
                        }}
                      />
                    )}
                    <sidebar.icon className="relative z-10 float-left block text-base text-white" />
                    <p
                      className={`relative z-10 flex-1 font-playfair text-base font-medium text-white transition-all duration-300 ${
                        toggle && "hidden"
                      }`}
                    >
                      {sidebar.name}
                    </p>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
