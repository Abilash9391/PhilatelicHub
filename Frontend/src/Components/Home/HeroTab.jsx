import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductContext } from "../../Context/ProductContext";
import Button from "../Button/Button";
import Motion from "../Motion/Motion";

const HeroTab = ({ products }) => {
  const { imageFile, name, _id } = products;
  const { addToCart } = useContext(ProductContext);
  const transition = { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.9] };

  return (
    <>
      <Motion direction="up" delay={0.3}>
        <div className="h-[320px] w-[250px] rounded-3xl bg-secondary p-1">
          <Link to={`/product/${name}`}>
            <div className="overflow-hidden rounded-3xl bg-lightgrey">
              <motion.img
                whileHover={{ scale: 1.07 }}
                transition={transition}
                src={imageFile}
                placeholder="blur"
                className="h-[200px] w-full rounded-3xl object-cover"
              />
            </div>
          </Link>
          <div className="mt-3 text-pretty text-center text-white">
            <div className="mb-3 flex flex-col gap-2 font-raleway text-xl">
              <h1>{name}</h1>
            </div>
            <div onClick={() => addToCart(_id)}>
              <Button
                Text_Color={"white"}
                Font={"raleway"}
                Padding_Y={"12px"}
                Padding_X={"32px"}
                Text={"Add to Cart"}
              />
            </div>
          </div>
        </div>
      </Motion>
    </>
  );
};

export default HeroTab;
