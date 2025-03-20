import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";


const VerifyProducts = () => {
  const userId=localStorage.getItem("userId");
  const [products, setProducts] = useState([]);
  const { id } = useParams();
    useEffect(() => {
        // Fetch products from API
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/product/userverifyprod/${userId}`); 
                if(response.data.success){
                  setProducts(response.data.data);
                console.log(response.data.message);
                }
              } catch (error) {
                console.log("Failed to fetch products:", error)
              }
        };

        fetchProducts();
    }, []);

    const transition = { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.9] };

  const details = products.find((item) => item._id === id)
  if(!details)
    console.log("NO item");
  const {
    name,
    brand,
    category,
    price,
    imageFile,
    description,
    color,
    features,
    inStock,
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


export default VerifyProducts;
