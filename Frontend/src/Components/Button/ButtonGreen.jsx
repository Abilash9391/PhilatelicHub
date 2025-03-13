import React from "react";
import { motion } from "framer-motion";
import LoadingWhite from "../../assets/loadingwhite.svg";
const ButtonGreen = ({ 
  onClick, // Added onClick prop

  type = "button", // Added default type

  Text,
  Text_Color,
  Font,
  Padding_X,
  Padding_Y,
  isLoading = false,
}) => {
  return (
    <>
      <motion.button
        onClick={onClick} // Added onClick to button

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
        className="radial-gradient-green relative rounded-full"
        style={{
          padding: `${Padding_Y} ${Padding_X}`,
        }}
      >
        <span
          className="linear-mask-green relative z-10 block h-full w-full text-xs font-normal tracking-wide md:text-base"
          style={{
            color: Text_Color,
            fontFamily: Font,
          }}
        >
          {isLoading ? (
            <div>
              <img src={LoadingWhite} className="h-6 w-6" />
            </div>
          ) : (
            <div>
              <p className="">{Text}</p>
            </div>
          )}
        </span>
        <span className="linear-overlay-green absolute inset-0 block rounded-full p-px" />
      </motion.button>
    </>
  );
};

export default ButtonGreen;
