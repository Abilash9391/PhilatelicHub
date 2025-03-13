import React from "react";
import UserIcon from "../Icons/UserIcon";
import { RxHamburgerMenu } from "react-icons/rx";
const Navbar = ({ toggleMenu }) => {
  return (
    <>
      <div className="flex h-20 w-full items-center justify-end bg-background px-10">
        <div className="flex items-center justify-center gap-7 text-white">
          <UserIcon />

          <RxHamburgerMenu
            size={20}
            className="block text-white hover:text-accent md:hidden"
            onClick={toggleMenu}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
