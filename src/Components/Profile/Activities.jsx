import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "../../Context/Modal";
import toast from "react-hot-toast/headless";
export default function Activities() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const { handleBackgroundDropDown, handleBackgroundClickNav } =
    useContext(ModalContext);

  const handleWishlist = async () => {
    toast.loading("Getting Your Wishlist...");
    try {
      const response = await fetch(
        "https://devin-vogue-backend-deployment-2.onrender.com/GetWishlist",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      toast.dismiss();
      setWishlistItems(data.Data);
    } catch (err) {
      toast.dismiss();
      toast.error(err);
      console.log(err);
    }
  };

  const handleCart = async () => {
    toast.loading("Getting Your Cart...");
    try {
      const response = await fetch(
        "https://devin-vogue-backend-deployment-2.onrender.com/userItems",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      toast.dismiss();
      setCartItems(data.Items);
    } catch (err) {
      toast.dismiss();
      toast.error(err);
      console.log(err);
    }
  };

  useEffect(() => {
    handleWishlist();
    handleCart();
  }, []);

  const handleClickDropDown = (e) => {
    handleBackgroundClickNav(e);
    handleBackgroundDropDown(e);
  };

  return (
    <div onClick={handleClickDropDown} className="p-6 main  min-h-screen">
      <section className="mb-12 main" onClick={handleClickDropDown}>
        {wishlistItems.length >= 1 ? (
          <h1
            onClick={handleClickDropDown}
            className="text-3xl main mt-4 font-light text-center text-gray-400 mb-6"
          >
            Your Wishlist
          </h1>
        ) : (
          <h1
            onClick={handleClickDropDown}
            className="text-3xl main mt-4 font-light text-center text-gray-400 mb-6"
          >
            Your Wishlist Is Empty
          </h1>
        )}
        <div
          onClick={handleClickDropDown}
          className="flex main flex-wrap gap-6 justify-center"
        >
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden w-64 flex flex-col items-center"
            >
              <Link to={`/${item.ItemId}`}>
                <img
                  className="h-full hover:scale-105 duration-300 cursor-pointer w-full object-cover"
                  src={item.image}
                  alt={item.name}
                />
              </Link>
              <div className="p-4 text-center">
                <h2 className="text-xs text-gray-400 font-semibold ">
                  {item.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        {cartItems.length >= 1 ? (
          <h1 className="text-3xl mt-4 font-light text-center text-gray-400 mb-6">
            Your Cart
          </h1>
        ) : (
          <h1 className="text-3xl mt-4 font-light text-center text-gray-400 mb-6">
            Your cart Is Empty
          </h1>
        )}
        <div className="flex flex-wrap gap-6 justify-center">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden w-64 flex flex-col items-center"
            >
              <Link to={`/${item.ItemId}`}>
                <img
                  className="h-full hover:scale-105 duration-300 cursor-pointer w-full object-cover"
                  src={item.image}
                  alt={item.name}
                />
              </Link>
              <div className="p-4 text-center">
                <h2 className="text-xs text-gray-400 font-semibold ">
                  {item.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}