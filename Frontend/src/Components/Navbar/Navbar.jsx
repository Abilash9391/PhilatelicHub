import { React, useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence, spring } from "framer-motion";
import ProfileNav from "./ProfileNav";
import { ProductContext } from "../../Context/ProductContext";
import MobileMenu from "./MobileMenu";
import UserIcon from "../../assets/Icons/UserIcon";
import CartIcon from "../../assets/Icons/CartIcon";
import Logo from "../../assets/logo.png";
import Motion from "../Motion/Motion";

const Navbar = ({ activeTab, setActiveTab }) => {
  const { getTotalCartAmount } = useContext(ProductContext);

  const navbar = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "New Collection", link: "/newcollection" },
    { id: 3, name: "Product", link: "/product" },
    { id: 4, name: "Community", link: "/community" },
    { id: 5, name: "Education", link: "/education" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <MobileMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <div className="bg-background">
        <Motion direction="down" delay={0.2}>
          <div className="container">

            <div className="relative flex h-20 w-full items-center justify-between">
              <div>
                <img className="h-20 w-20" src={Logo} />
              </div>

              <div className="hidden gap-x-5 md:flex">
                {navbar.map((navbar) => (
                  <NavLink key={navbar.id} to={navbar.link}>
                    <button
                      onClick={() => setActiveTab(navbar.id)}
                      className={`${activeTab === navbar.id ? "text-white" : "text-tetiary"} relative rounded-full px-3 py-1.5 font-raleway font-semibold hover:text-white`}
                    >
                      {activeTab === navbar.id && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 bg-primary"
                          transition={{ type: spring, duration: 0.5 }}
                          style={{ borderRadius: 9999 }}
                        />
                      )}
                      <p className="relative z-10">{navbar.name}</p>
                    </button>
                  </NavLink>
                ))}
              </div>

              <div className="flex items-center justify-between gap-x-5 text-base">
                <div
                  className="relative"
                  onClick={() => setIsProfileOpen(true)}
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  <UserIcon className="hidden md:block" />
                  {isProfileOpen && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 15 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ x: "-50%" }}
                        className="absolute left-1/2 top-6 z-20"
                      >
                        <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent" />
                        <ProfileNav />
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>

                <div className="relative">
                  <Link to="/cart">
                    <CartIcon />
                    {getTotalCartAmount() > 0 && (
                      <span className="absolute -right-0 -top-0 h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                </div>

                <RxHamburgerMenu
                  size={20}
                  className="block text-white hover:text-primary md:hidden"
                  onClick={toggleMenu}
                />
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </>
  );
};

export default Navbar;
