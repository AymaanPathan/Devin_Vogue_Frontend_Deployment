/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect } from "react";
import { WishListcontext } from "../../Context/WishListContext";
import { Link } from "react-router-dom";
import "./wishlist.css";
import emptyWishlist from "./marketing.png";
import closeImg from "./close.png";
import { ModalContext } from "../../Context/Modal";

export default function WishListItems() {
  const { RemoveWishlist, fetchWishlist, Items } = useContext(WishListcontext);
  const { handleBackgroundDropDown, handleBackgroundClickNav } =
    useContext(ModalContext);

  const handleClickDropDown = (e) => {
    handleBackgroundClickNav(e);
    handleBackgroundDropDown(e);
  };

  useEffect(() => {
    fetchWishlist();
  }, [Items]);

  if (!Items || Items.length === 0) {
    return (
      <div onClick={handleClickDropDown} className="main select-none">
        <h1
          onClick={handleClickDropDown}
          className="text-center main text-2xl mt-4 font-bold text-gray-400  tracking-wide"
        >
          Explore Your Wishlists
        </h1>
        <div onClick={handleClickDropDown} className="empty-wishlist main">
          <img
            src={emptyWishlist}
            alt="Empty Wishlist"
            className="wishlist-img"
          />
          <h2 className="text-2xl font-semibold mb-6">
            Your Wishlist is Empty
          </h2>
          <p className="text-lg text-gray-500 mb-6 w-96">
            Looks like you haven't added anything to your wishlist yet. Explore
            our products and add items to your wishlist.
          </p>
          <Link to="/">
            <button className="py-3 px-6 bg-[#ffffff] text-white rounded-lg hover:bg-[#5a342d] duration-200">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // If Items has data, render the wishlist items
  return (
    <div onClick={handleBackgroundClickNav} className="main select-none">
      <div
        onClick={handleBackgroundClickNav}
        className="wishlist-container main flex flex-wrap justify-center"
      >
        {Items.map((item) => (
          <div
            key={item.id}
            className="wishlist-item h-fit overflow-hidden transform transition-transform relative"
          >
            <img
              className="wishlist-img object-cover"
              src={item.image}
              alt={item.name}
            />
            <Link to={`/${item.ItemId}`}>
              <button className="w-full h-full py-2 rounded-b-lg text-black bg-[#ebecec] hover:bg-gray-200 duration-100">
                Visit Product
              </button>
            </Link>
            <img
              src={closeImg}
              alt="Cross Img"
              onClick={() => RemoveWishlist(item._id)}
              className="cursor-pointer w-3 h-3 cross-icon text-xl absolute text-black top-1 right-1 far fa-times-circle"
            />
            <div className="absolute top-2 left-2 bg-white opacity-60 text-black border text-xs px-2 py-1 rounded">
              Your Wishlist
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
