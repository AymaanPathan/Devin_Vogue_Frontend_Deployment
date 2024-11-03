import "./hero.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import discount from "./discount.png";
import lady from "./lady_img.png";
import "./Services";
import { ModalContext } from "../../Context/Modal";

function Hero() {
  const { handleBackgroundDropDown, handleBackgroundClickNav } =
    useContext(ModalContext);

  const handleClick = (e) => {
    handleBackgroundClickNav(e);
    handleBackgroundDropDown(e);
  };

  return (
    <div className="main_hero  bg-[#F5F8FA] flex px-8">
      {/* Left */}
      <div
        onClick={(e) => handleClick(e)}
        className="left main flex flex-col p-16  gap-11"
      >
        <div className="discount-main flex items-center gap-3 cursor-pointer w-fit py-2 px-4 rounded-xl bg-white">
          <img className="w-6 h-6" src={discount} alt="discount" /> Enjoy 50%
          <p className="text-[#1B2834]">OFF in Our Summer Super Sale!</p>
        </div>
        <p className="hero-heading-text font-bold text-[#1B2834] text-4xl">
          Step into Fashion at Your Ultimate Style Destination!
        </p>
        <span className="hero-subtitle text-gray-400">
          Explore a World of Fashion Possibilities with Exclusive Discounts -
          Dive into Your Ultimate Style Destination and Elevate Your Wardrobe
          Today!
        </span>
        <Link
          to={"/shop"}
          className="hero-btn bg-[#1B2834] inline-flex items-center gap-2 font-semibold w-fit text-white py-2 px-6 rounded-md"
        >
          Shop Now
          <i className="fas fa-arrow-right hover:translate-x-1 duration-150 text-xl "></i>
        </Link>
      </div>

      {/* Right */}
      <div className="right main">
        <img className="hero-img h-full w-[48rem]" src={lady} alt="" />
      </div>
    </div>
  );
}

export default Hero;
