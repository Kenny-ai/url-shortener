import React from "react";
import { ReactComponent as Logo } from "../svg/logo.svg";
import { ReactComponent as Hamburger } from "../svg/hamburger.svg";
import { ReactComponent as IconClose } from "../svg/icon-close.svg";

interface Props {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({ showNav, setShowNav }) => {
  return (
    <div className="header xl:flex justify-center ">
      <div className="header-container flex justify-between items-center p-6 border-b border-b-gray-400 lg:px-4 xl:px-0 xl:w-4/5 xl:py-10 md:border-b-gray-300">
        <div className="md:hidden">
          <Logo />
        </div>

        <div className="items-center justify-around w-1/2 hidden md:w-2/3 md:flex">
          <Logo />
          <p className="text-gray-400 font-bold md:text-sm cursor-pointer hover:text-gray-800">
            Features
          </p>
          <p className="text-gray-400 font-bold md:text-sm cursor-pointer hover:text-gray-800">
            Pricing
          </p>
          <p className="text-gray-400 font-bold md:text-sm cursor-pointer hover:text-gray-800">
            Resources
          </p>
        </div>

        <div className="items-center justify-end w-1/2 hidden md:flex">
          <button className="font-bold text-gray-400 mr-4 md:text-sm cursor-pointer hover:text-gray-800">
            Login
          </button>
          <button className="bg-teal-400 font-bold  text-white px-5 py-2 rounded-full md:text-sm hover:bg-teal-300 transition-all">
            Sign Up
          </button>
        </div>

        {!showNav && (
          <div
            className="hamburger cursor-pointer md:hidden"
            onClick={() => {
              setShowNav(true);
            }}
          >
            <Hamburger />
          </div>
        )}

        {showNav && (
          <div
            className="close-icon cursor-pointer md:hidden"
            onClick={() => {
              setShowNav(false);
            }}
          >
            <IconClose />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
