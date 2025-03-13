import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence, animate, delay } from "framer-motion";
import { Link } from "react-router-dom";

const StaggeredDropDown = ({ toggleMenu, isMenuOpen }) => {
  const container = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.4,
        staggerDirection: 1,
        duration: 0.3,
      },
    },
    exit: {
      when: "afterChildren",
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
        delay: 0.2,
      },
    },
  };

  const item = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: {
        ease: "easeInOut",
        duration: 0.2,
        delay: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: {
      opacity: 0,
      height: 0,
    },
    animate: {
      opacity: 1,
      height: "100vh",
      transition: { duration: 0.3, ease: "easeInOut", when: "beforeChildren" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        delay: 0.3,
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.nav
          key="menu"
          variants={itemVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed top-0 z-20 w-screen bg-background md:hidden"
        >
          <div className="relative">
            <div className="absolute right-8 top-6">
              <IoClose
                className="text-white hover:text-primary"
                size={32}
                onClick={toggleMenu}
              />
            </div>
            <motion.ul
              variants={container}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center justify-center gap-y-16 pt-32"
            >
              <Link to="/">
                <motion.li
                  onClick={toggleMenu}
                  variants={item}
                  className="cursor-pointer font-lora text-3xl uppercase text-white transition-colors hover:text-accent"
                >
                  Home
                </motion.li>
              </Link>
              <Link to="/product">
                <motion.li
                  onClick={toggleMenu}
                  variants={item}
                  className="cursor-pointer font-lora text-3xl uppercase text-white transition-colors hover:text-accent"
                >
                  Product
                </motion.li>
              </Link>
              <Link to="/newcollection">
                <motion.li
                  onClick={toggleMenu}
                  variants={item}
                  className="cursor-pointer font-lora text-3xl uppercase text-white transition-colors hover:text-accent"
                >
                  New Collection
                </motion.li>
              </Link>
            </motion.ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default StaggeredDropDown;
