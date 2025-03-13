import { motion, useAnimation } from "framer-motion";

const pathVariants = {
  normal: { d: "M5 12h14" },
  animate: {
    d: ["M5 12h14", "M5 12h9", "M5 12h14"],
    transition: {
      duration: 0.4,
    },
  },
};

const secondaryPathVariants = {
  normal: { d: "m12 5 7 7-7 7", translateX: 0 },
  animate: {
    d: "m12 5 7 7-7 7",
    translateX: [0, -3, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const ArrowRightIcon = ({ isHovered }) => {
  const controls = useAnimation();

  return (
    <div
      className="flex cursor-pointer select-none items-center justify-center rounded-md p-2 text-white transition-colors duration-200"
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M5 12h14"
          variants={pathVariants}
          animate={isHovered ? "animate" : "normal"}
        />
        <motion.path
          d="m12 5 7 7-7 7"
          variants={secondaryPathVariants}
          animate={isHovered ? "animate" : "normal"}
        />
      </svg>
    </div>
  );
};

export default ArrowRightIcon;
