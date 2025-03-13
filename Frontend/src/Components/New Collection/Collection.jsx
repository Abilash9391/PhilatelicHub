import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Motion from "../Motion/Motion";

const Collection = ({ products }) => {
  const { imageFile, name, description } = products;
  const transition = { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.9] };

  return (
    <>
      <Motion direction="up" delay={0.4}>
        <div className="h-[600px] w-[350px] rounded-3xl bg-background p-2">
          <div className="overflow-hidden rounded-3xl bg-lightgrey">
            <motion.img
              whileHover={{ scale: 1.07 }}
              transition={transition}
              src={imageFile}
              placeholder="blur"
              className="h-[350px] w-full rounded-3xl object-cover"
            />
          </div>
          <div className="mt-8 text-pretty text-center text-white">
            <div className="flex flex-col gap-2 pb-8">
              <h1 className="font-libre text-2xl font-semibold">{name}</h1>
              <p className="line-clamp-2 font-lora text-xl">{description}</p>
            </div>

            <button className="rounded-full border bg-background py-1.5 pl-4 pr-1">
              <div className="flex items-center gap-5">
                <span>Know More</span>
                <Link to={`/product/${name}`}>
                  <div className="rounded-full bg-white px-2 py-2 text-xl text-black transition-all duration-700 hover:bg-accent">
                    <FiArrowUpRight />
                  </div>
                </Link>
              </div>
            </button>
          </div>
        </div>
      </Motion>
    </>
  );
};

export default Collection;
