import { React, useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import Button from "../Components/Button/Button";
import Tabs from "../Components/Product/Tabs";
import Motion from "../Components/Motion/Motion";

const ProductDetails = () => {
  const transition = { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.9] };

  const { name } = useParams();
  const { products, cartItems, addToCart, removeFromCart } =
    useContext(ProductContext);
  if (!Array.isArray(products)) {
    console.log("Products is not an array");
  }
  const details = products.find((item) => {
    return item.name === name;
  });
  const {
    _id,
    brand,
    category,
    price,
    imageFile,
    description,
    color,
    features,
    inStock,
    newCollection,
  } = details;

  return (
    <div className="bg-tetiary">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, height: "0px", width: "0px" }}
            animate={{ opacity: 1, height: "100%", width: "100%" }}
            transition={transition}
            className="col-span-2 flex justify-center"
          >
            <div className="aspect-square max-h-[535px] max-w-[535px]">
              <img
                src={imageFile}
                className="h-full w-full origin-center object-cover"
              />
            </div>
          </motion.div>
          <Motion direction="left" delay={0.2}>
            <div className="flex flex-col gap-5">
              <div>
                <p className="font-manrope text-2xl">{brand}</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-raleway text-4xl">{name}</p>
                <p className="font-raleway text-2xl">${price}</p>
                <p className="font-manrope">incl. local Tax & Shipping.</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="line-clamp-3">{description}</p>
                <p>Color : {color}</p>
                {inStock ? (
                  <p className="text-green-500">In Stock</p>
                ) : (
                  <p className="text-rose-500">Not In Stock</p>
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
                    <div className="flex h-10 w-32 items-center justify-between gap-2 rounded-full">
                      <FaMinus
                        onClick={() => removeFromCart(_id)}
                        className="ml-1 h-6 w-6 cursor-pointer rounded-full bg-red-500 p-1 text-white"
                      />
                      <p className="font-libre">{cartItems[_id]}</p>
                      <FaPlus
                        onClick={() => addToCart(_id)}
                        className="bg-grenn-500 mr-1 h-6 w-6 cursor-pointer rounded-full bg-green-500 p-1 text-white"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </Motion>
        </div>
        <div className="my-4">
          <Tabs features={features} description={description} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
