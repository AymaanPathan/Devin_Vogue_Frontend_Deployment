/* eslint-disable react-hooks/exhaustive-deps */
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { Productcontext } from "../../Context/Product";
import FancyBox from "./FancyBox";
import close from "./close.png";
import "./cart.css";
import { ModalContext } from "../../Context/Modal";

function CartItem() {
  const { cartItem, setCartItem, removeFromCart, products, emptyCart } =
    useContext(Productcontext);
  const { handleBackgroundClickNav, handleBackgroundDropDown } =
    useContext(ModalContext);
  const [loading, setLoading] = useState(true);
  const handleClickDropDown = (e) => {
    handleBackgroundClickNav(e);
    handleBackgroundDropDown(e);
  };

  const [loggedIn, setLoggedIn] = useState(true);

  const GetCart = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch(
          "https://devin-vogue-backend-deployment-2.onrender.com/GetCart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const result = await response.json();
        setCartItem(result.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoggedIn(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    GetCart();
  }, [cartItem]);

  const price = products
    .reduce(
      (total, product) =>
        total + (cartItem[product.ItemId] || 0) * product.newPrice,
      0
    )
    .toFixed(2);

  if (loading) {
    return <div className="text-center my-8">Loading cart...</div>;
  }

  const handlePayment = async () => {
    if (!cartItem === 0) {
      return console.log("No");
    }
    try {
      toast.loading("Checking....");
      const response = await fetch(
        "https://devin-vogue-backend-deployment-2.onrender.com/payment",
        {
          method: "POST",
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.url;
        toast.dismiss();
      } else {
        toast.dismiss();
        toast.error("Your Cart is Empty");
      }
    } catch (error) {
      toast.error("Please Try Again Later");
    }
  };

  return (
    <>
      {!loggedIn && <FancyBox />}
      <div
        onClick={handleClickDropDown}
        className={`main container mx-auto px-4 ${!loggedIn ? "blur-sm" : ""}`}
      >
        <h1
          onClick={handleClickDropDown}
          className=" main text-center text-4xl font-light text-gray-600 tracking-wide mt-6 mb-4"
        >
          Shopping Bag
        </h1>
        {products.length > 0 && Object.keys(cartItem).length > 0 ? (
          <div
            onClick={handleClickDropDown}
            className="grid main   grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div onClick={handleClickDropDown} className="lg:col-span-2 main">
              {products.map((product) => {
                if (cartItem[product.ItemId] > 0) {
                  return (
                    <div
                      key={product.ItemId}
                      className="p-6 w-full border   mb-4 flex items-center"
                    >
                      <img
                        className="h-full w-24 mr-4 rounded-lg"
                        src={product.image}
                        alt={product.name}
                      />
                      <div className="flex flex-col flex-grow">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h3 className="text-md font-medium text-[#8D493A]">
                              {product.name}
                            </h3>
                            <span className="text-xs text-gray-400">
                              Sold by: GENUS APPARELS LTD.
                            </span>
                          </div>
                          <img
                            src={close}
                            alt="close-img"
                            onClick={() => removeFromCart(product.ItemId)}
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                        <span className="h-4 text-center w-12 bg-[#F5F5F6] text-xs font-light">
                          Qty: {cartItem[product.ItemId]}
                        </span>
                        <div className="flex items-center justify-start my-4 gap-4">
                          <p className="text-gray-900 font-bold">
                            ₹{product.newPrice}
                          </p>
                          <p className="text-[#C0BFC0]  line-through">
                            ₹{product.oldPrice}
                          </p>
                          <p className="text-[#389674] font-bold  ">
                            (55% OFF)
                          </p>
                        </div>
                        <div className="mb-2 "></div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className="bg-white   p-6">
              <h2 className="text-2xl font-medium text-gray-800 mb-4">
                Summary
              </h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Taxes</span>
                <span>No Tax</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <hr className="my-2 w-full" />
              <div className="flex justify-between mb-4">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-semibold text-gray-800">
                  ₹{price > 0 ? parseFloat(price).toFixed(2) : 0}
                </span>
              </div>
              <button
                onClick={handlePayment}
                className="active:scale-95  rounded-sm text-black border py-2 px-4  w-full transition duration-200"
              >
                Checkout
              </button>
              <button
                onClick={emptyCart}
                className="bg-red-500 hover:brightness-400 text-white py-2 px-4 rounded-sm w-full mt-4 transition duration-200"
              >
                Empty Cart
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center my-8">Your shopping bag is empty.</div>
        )}
      </div>
    </>
  );
}

export default CartItem;
