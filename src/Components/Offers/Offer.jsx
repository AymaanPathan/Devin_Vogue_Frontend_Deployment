import { useContext } from "react";
import { Link } from "react-router-dom";
import "./offer.css";
import { Productcontext } from "../../Context/Product";

export default function Offer() {
  const { handleSmoothScroll } = useContext(Productcontext);
  return (
    <div className="main_Offer bg-[#F5F8FA] grid grid-cols-2 h-fit mt-24 px-2">
      {/* Left */}
      <div className="left flex flex-col p-16  gap-11">
        <p className="text-[#1B2834] text-2xl font-bold">Limited Time Offers</p>
        <p className="offer-body font-bold text-[#1B2834] text-4xl">
          Get 50% Off All Fashion - Limited Time Offer!
        </p>
        <span className=" text-gray-400">
          Discover Your Signature Look for Less - Enjoy discount All Fashion
          Items! Limited Time Offer, Act Fast!
        </span>
        <Link onClick={handleSmoothScroll} to={"/shop"}>
          <button className="bg-[#1B2834]  inline-flex items-center gap-2 font-semibold w-fit text-white py-2 px-6 rounded-md">
            Shop Now
            <i className="fas fa-arrow-right hover:translate-x-1 duration-150 text-xl "></i>
          </button>
        </Link>
      </div>
    </div>
  );
}
