import { React, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ProductContext } from "../../Context/ProductContext";
import Button from "../Button/Button";

const Shoppage = ({ updateproducts }) => {
  const [hover, setHover] = useState(false);
  const { name, price, imageFile, inStock, newCollection, _id,quantity } =
    updateproducts;
  const onHover = () => {
    setHover(!hover);
  };
  const { cartItems, addToCart, removeFromCart } = useContext(ProductContext);
  const transition = { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.9] };
  return (
    <>
      <motion.div
        exit={{ opacity: 0 }}
        transition={transition}
        className="w-full max-w-[380px] rounded-3xl bg-secondary p-2"
      >
        <div className="flex flex-row gap-2">
          <Link to={`/product/${name}`}>
            <div className="relative h-[150px] w-[200px] overflow-hidden rounded-3xl bg-lightgrey">
              <motion.img
                whileHover={{ scale: 1.07 }}
                transition={transition}
                src={imageFile}
                className="h-full w-full rounded-3xl object-cover"
              />
              {newCollection && (
                <p className="absolute left-3 top-2 flex items-center justify-center bg-black px-0.5 py-0.5 text-xs text-white">
                  NEW
                </p>
              )}
            </div>
          </Link>

          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-2 pt-1">
              <p className="font-raleway text-lg text-white">{name}</p>
              <p className="font-raleway text-white">${price}</p>
              <p className="font-raleway text-white">{quantity}</p>
              {inStock ? (
                <p className="font-raleway text-green-500">In Stock</p>
              ) : (
                <p className="font-raleway text-rose-500">Not In Stock</p>
              )}
            </div>
            {inStock && (
              <div>
                {!cartItems[_id] ? (
                  <div onClick={() => addToCart(_id)}>
                    <Button
                      Text_Color={"white"}
                      Font={"raleway"}
                      Padding_Y={"8px"}
                      Padding_X={"24px"}
                      Text={"Add to Cart"}
                    />
                  </div>
                ) : (
                  <div className="flex h-10 items-center justify-between gap-2 rounded-full bg-secondary md:w-24 lg:w-32">
                    <FaMinus
                      onClick={() => {
                        
                        removeFromCart(_id);
                      }}
                      className="ml-1 h-6 w-6 cursor-pointer rounded-full bg-red-500 p-1 text-white"
                    />
                    <p className="font-libre text-white">{cartItems[_id]}</p>
                    <FaPlus
                      onClick={() => addToCart(_id)}
                      className="bg-grenn-500 mr-1 h-6 w-6 cursor-pointer rounded-full bg-green-500 p-1 text-white"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Shoppage;