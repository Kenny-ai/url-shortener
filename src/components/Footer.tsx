import { ReactComponent as Logo } from "../svg/white-logo.svg";
import { ReactComponent as Facebook } from "../svg/icon-facebook.svg";
import { ReactComponent as Pinterest } from "../svg/icon-pinterest.svg";
import { ReactComponent as Twitter } from "../svg/icon-twitter.svg";
import { ReactComponent as Instagram } from "../svg/icon-instagram.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container flex flex-col justify-center items-center py-12 xl:flex-row xl:justify-evenly xl:items-start">
        <div className="footer-header text-white mb-8">
          <Logo className="" />
        </div>

        <div className="text-center xl:text-left">
          <p className="text-white font-bold mb-4 xl:mb-6">Features</p>
          <p className="text-gray-400 mb-2 xl:mb-4 hover:text-teal-300 transition-all cursor-pointer">
            Link Shortening
          </p>
          <p className="text-gray-400 mb-2 xl:mb-4 hover:text-teal-300 transition-all cursor-pointer">
            Branded Links
          </p>
          <p className="text-gray-400 mb-8 hover:text-teal-300 transition-all cursor-pointer">
            Analytics
          </p>
        </div>

        <div className="text-center xl:text-left">
          <p className="text-white font-bold mb-4 xl:mb-6">Resources</p>
          <p className="text-gray-400 mb-2 xl:mb-4 hover:text-teal-300 transition-all cursor-pointer">
            Blog
          </p>
          <p className="text-gray-400 mb-2 xl:mb-4 hover:text-teal-300 transition-all cursor-pointer">
            Developers
          </p>
          <p className="text-gray-400 mb-8 hover:text-teal-300 transition-all cursor-pointer">
            Support
          </p>
        </div>

        <div className="text-center xl:text-left">
          <p className="text-white font-bold mb-4 xl:mb-6">Company</p>
          <p className="text-gray-400 mb-2 xl:mb-4 hover:text-teal-300 transition-all cursor-pointer">
            About
          </p>
          <p className="text-gray-400 mb-2 xl:mb-4 hover:text-teal-300 transition-all cursor-pointer">
            Our Team
          </p>
          <p className="text-gray-400 mb-2 xl:mb-4 hover:text-teal-300 transition-all cursor-pointer">
            Careers
          </p>
          <p className="text-gray-400 mb-10 hover:text-teal-300 transition-all cursor-pointer">
            Contact
          </p>
        </div>

        <div className="text-center flex gap-4 xl:gap-8">
          <i className=" outline-2 outline outline-white rounded-full w-10 h-10 inline-flex justify-center items-center cursor-pointer transition-outline duration-300 hover:outline-offset-4 hover:outline-facebook hover:bg-facebook-bg hover:animate-shake">
            <Facebook />
          </i>
          <i className=" outline-2 outline outline-white rounded-full w-10 h-10 inline-flex justify-center items-center cursor-pointer transition-outline duration-300 hover:outline-offset-4 hover:outline-twitter hover:bg-twitter-bg hover:animate-shake">
            <Twitter />
          </i>
          <i className=" outline-2 outline outline-white rounded-full w-10 h-10 inline-flex justify-center items-center cursor-pointer transition-outline duration-300 hover:outline-offset-4 hover:outline-pinterest hover:bg-pinterest-bg hover:animate-shake bg-">
            <Pinterest />
          </i>

          <i className="outline-2 outline outline-white rounded-full w-10 h-10 inline-flex justify-center items-center cursor-pointer transition-outline duration-300 hover:outline-offset-4 hover:outline-instagram hover:bg-ig-gradient hover:animate-shake">
            <Instagram />
          </i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
