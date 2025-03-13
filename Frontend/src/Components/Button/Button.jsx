import React from "react";
import { motion } from "framer-motion";

const Button = ({ Text, Text_Color, Font, Padding_X, Padding_Y }) => {
  return (
    <>
      <motion.button
        initial={{ "--x": "100%", scale: 1 }}
        animate={{ "--x": "-100%" }}
        whileTap={{ scale: 0.97 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
          type: "spring",
          stiffness: 20,
          damping: 15,
          mass: 2,
          scale: {
            type: "spring",
            stiffness: 10,
            damping: 5,
            mass: 0.1,
          },
        }}
        className="radial-gradient relative rounded-full"
        style={{
          padding: `${Padding_Y} ${Padding_X}`,
        }}
      >
        <span
          className="linear-mask relative z-10 block h-full w-full text-xs font-normal tracking-wide md:text-base"
          style={{
            color: Text_Color,
            fontFamily: Font,
          }}
        >
          {Text}
        </span>
        <span className="linear-overlay absolute inset-0 block rounded-full p-px" />
      </motion.button>
    </>
  );
};

export default Button;
