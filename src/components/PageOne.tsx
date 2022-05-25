import React from "react";
// import { ReactComponent as Illustratio } from "../svg/illustration-working.svg";
import Illustration from "../svg/illustration-working.png";

interface Props {
  showNav: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageOne: React.FC<Props> = ({ showNav, setClicked }) => {
  return (
    <div className="pageOne">
      {showNav && (
        <div className="mobile-nav-container px-8 md:hidden">
          <div className="mobile-nav flex flex-col text-white p-8 rounded-xl">
            <button className="mb-6 font-bold text-lg hover:text-teal-400">
              Features
            </button>
            <button className="mb-6 font-bold text-lg hover:text-teal-400">
              Pricing
            </button>
            <button className="mb-7 font-bold text-lg hover:text-teal-400">
              Resources
            </button>
            <hr className="mb-7 border-t-gray-500" />
            <button className="mb-6 font-bold text-lg hover:text-teal-400">
              Login
            </button>
            <button className="bg-teal-400 py-2 rounded-full font-bold text-lg hover:bg-teal-300">
              Sign Up
            </button>
          </div>
        </div>
      )}

      <div className="w-full pb-24 md:flex md:flex-row-reverse md:pl-20 xl:pl-48 md:pt-12">
        <div className="illustration mb-8">
          <img
            src={Illustration}
            alt="illustration-working"
            className="object-contain"
          />
        </div>

        <div className="flex flex-col justify-center items-center px-4 md:w-1/2 md:items-start">
          <p className="text-center text-4xl font-bold mb-4 text-gray-800 leading-tight md:text-5xl lg:text-6xl xl:text-7xl md:text-left md:leading-snug">
            More than just shorter links
          </p>

          <p className="text-center text-gray-400 text-lg tracking-wide leading-relaxed mb-12 md:text-left md:text-2xl">
            Build your brand's recognition and get detailed insights on how your
            links are performing.
          </p>

          <button
            className="text-white bg-teal-400 rounded-full px-10 py-3 text-2xl font-bold mb-16 hover:bg-teal-300 transition-all"
            onClick={() => {
              setClicked(true);
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageOne;
