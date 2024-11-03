import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "./hanger.png";
import DropDown from "./DropDown/DropDown";
import { Productcontext } from "../../Context/Product";
import { ModalContext } from "../../Context/Modal";

function Navbar() {
  const { cartCount } = useContext(Productcontext);
  const { navOpen, toggleNav, dropdownOpen, toggleDropdown } =
    useContext(ModalContext);
  const location = useLocation();

  return (
    <div className="nav__main flex lg:flex-row flex-col items-center gap-12 justify-between px-8 py-4 bg-white border-b-2 relative">
      <i
        className={`fas ${
          navOpen ? "fa-times" : "fa-bars"
        } absolute right-6 top-6 md:hidden cursor-pointer`}
        onClick={toggleNav}
        role="button"
        aria-label="Toggle menu"
      ></i>

      <div className="header-logo ml-4 flex items-center gap-4 cursor-pointer whitespace-nowrap">
        <Link to="/">
          <img className="w-full h-8" src={logo} alt="Devine Vogue Logo" />
        </Link>
        <Link to="/">Devine Vogue</Link>
      </div>

      <ul
        className={`py-2 select-none ${
          navOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-center gap-8 whitespace-nowrap text-gray-900  cursor-pointer`}
      >
        <li
          className={`${
            location.pathname === "/" ? "border-b-2 border-[#1B2834]" : ""
          } hover:text-black`}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className={`${
            location.pathname === "/shop" ? "border-b-2 border-[#1B2834]" : ""
          } hover:text-black`}
        >
          <Link to="/shop">Shop</Link>
        </li>
        <li
          className={`${
            location.pathname === "/shop/men"
              ? "border-b-2 border-[#1B2834]"
              : ""
          } hover:text-black`}
        >
          <Link to="/shop/men">Men</Link>
        </li>
        <li
          className={`${
            location.pathname === "/shop/women"
              ? "border-b-2 border-[#1B2834]"
              : ""
          } hover:text-black`}
        >
          <Link to="/shop/women">Women</Link>
        </li>

        <li
          className={`${
            location.pathname === "/wishlist"
              ? "border-b-2 border-[#1B2834]"
              : ""
          } hover:text-black`}
        >
          <Link to="/wishlist" className="heart">
            Wishlist
          </Link>
        </li>
      </ul>

      <div className="md:flex-row  items-center  justify-center  flex w-48 gap-8 text-xl relative">
        <Link to="/cartItems">
          <i
            className="bx bx-shopping-bag cursor-pointer"
            role="button"
            aria-label="Cart"
          ></i>
        </Link>
        <i
          className="bx bx-user cursor-pointer"
          onClick={toggleDropdown}
          role="button"
          aria-label="User"
        ></i>
        {dropdownOpen && <DropDown />}
      </div>
    </div>
  );
}

export default Navbar;
