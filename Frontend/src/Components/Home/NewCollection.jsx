import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NewCollection = ({ activeTab, setActiveTab }) => {
  const product = [
    { id: 1, image: "/img/1.jpg", flex: true },
    { id: 2, image: "/img/2.jpg", flex: false },
    { id: 3, image: "/img/3.jpg", flex: true },
    { id: 4, image: "/img/4.jpg", flex: false },
    { id: 5, image: "/img/5.jpg", flex: true },
  ];
  const navbar = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "New Collection", link: "/newcollection" },
    { id: 3, name: "Product", link: "/product" },
  ];
  return (
    <>
      <div className=" pt-4 ">
        <div className="flex justify-center md:justify-start">
          <p className=" md:items-start md:pl-32 py-3 text-2xl md:text-4xl ">
            New Collection
          </p>
        </div>

        <div className={`grid grid-col-1 lg:grid-cols-2`}>
          {product.map((product) => (
            <div
              key={product.id}
              className="flex justify-evenly"
              // className={` flex pt-4 lg:${product.flex ? " justify-end" : "justify-center"}  `}
            >
              <img
                src={product.image}
                className=" object-cover max-w-[380px] md:max-w-[550px] h-[401px] "
              />
            </div>
          ))}
          <div className="flex justify-center  items-center w-full h-full pt-4">
            <div className="flex flex-col gap-y-2 items-center justify-center max-w-[380px] md:max-w-[550px] h-[401px]  dark:text-white ">
              <p>View New Collection</p>
              <NavLink
                to="/newcollection"
                onClick={() => setActiveTab(navbar[1].id)}
              >
                <button className="py-3 px-3 bg-transparent hover:bg-latergator hover:text-white  transition-all duration-500 rounded-full">
                  <FaArrowRight />
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCollection;
