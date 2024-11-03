/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Productcontext } from "../../Context/Product";
import toast from "react-hot-toast";
import { WishListcontext } from "../../Context/WishListContext";
import Similar from "./Similar";
import NewsLetter from "../NewsLetter/NewsLetter";
import Footer from "../Footer/Footer";

function Product() {
  const { setCartItem, handleCartCount, cartCount } =
    useContext(Productcontext);
  const { AddWishlist, Items } = useContext(WishListcontext);
  const { ItemID } = useParams();
  const [size, setSize] = useState();
  const [product, setProduct] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      toast.loading("Please Wait...");
      try {
        const response = await fetch(
          `https://devin-vogue-backend-deployment-dppj.vercel.app/product/${ItemID}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              token: token,
            },
          }
        );
        if (!response.ok) {
          toast.dismiss();
          toast.error("Failed to fetch product");
          throw new Error("Failed to fetch product");
        }
        toast.dismiss();
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        toast.dismiss();
        toast.error("Error fetching product");
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
    handleCartCount();
  }, [ItemID, cartCount]);

  const AddToCart = (ItemId) => {
    toast.loading("Adding To Your Cart...");
    setCartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] || 0 + 1 }));
    if (localStorage.getItem("token")) {
      fetch("https://devin-vogue-backend-deployment-2.onrender.com/AddToCart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          token: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ItemId: ItemId }),
      });
      toast.dismiss();
      toast.success("Item Added");
    }
    handleCartCount();
  };

  const handleCartMessage = () => {
    return toast.error("Register To Cart This Item");
  };

  const handleCart = () => {
    if (!size) {
      return toast.error("Please Select Size");
    }
    if (token) {
      AddToCart(product.ItemId);
    } else {
      handleCartMessage();
    }
  };

  const isInWishlist = (itemId) => {
    return Items.some((item) => item.ItemId === itemId);
  };

  useEffect(() => {
    handleCartCount();
    isInWishlist();
  }, [Items]);

  return (
    <div className="w-full main">
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:ml-6 mt-4 mb-7 lg:mb-0 px-4 lg:px-0">
        <div className="flex justify-center lg:justify-start lg:gap-2  lg:mb-0">
          <div className="flex gap-4">
            <img
              className="rounded-lg lg:h-[30rem] lg:w-[28rem]"
              src={product.image}
              alt=""
            />
          </div>
        </div>
        <div className="lg:ml-4 w-full lg:max-w-full lg:px-0 ">
          <h2 className=" text-2xl mt-8 lg:m-0 lg:text-2xl font-extrabold font-playfair-display text-[#464539]">
            {product.name}
          </h2>
          <p className="text-gray-600 text-xs w-80 lg:w-96 lg:text-md  font-light mt-4 ">
            {product.description}
          </p>
          <div className="flex gap-3 mt-4">
            <p className="text-[#464539] text-lg font-bold">
              ₹{product.newPrice}
            </p>
            <p className="text-gray-500  line-through  text-lg ">
              ₹{product.oldPrice}
            </p>
            <p className="text-[#389674] text-lg">(55% OFF)</p>
          </div>

          <div className="grid grid-cols-1 mt-6">
            <h1 className="font-bold text-gray-500">Select Size:</h1>
            <div className="flex text-xs lg:text-md gap-4  items-center">
              {["SX", "S", "M", "L", "XL"].map((sizeOption) => (
                <div
                  key={sizeOption}
                  onClick={() => setSize(sizeOption)}
                  className={`mt-4  border-2 border-gray-500 font-bold cursor-pointer  px-4 py-2 ${
                    size === sizeOption
                      ? "bg-black border-white text-white"
                      : ""
                  }`}
                >
                  {sizeOption}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10  flex gap-4">
            <button
              onClick={handleCart}
              className=" text-white active:scale-95 py-2 px-6 rounded-md bg-[#1B2834] w-full md:w-96"
            >
              <div>
                <p>{token ? "Add to Cart" : "Register to Cart"}</p>
              </div>
            </button>
            <button
              onClick={() => AddWishlist(product._id)}
              className={`border text-lg active:scale-95 rounded-md w-72  inline-flex justify-center gap-5 items-center`}
            >
              <i
                className={`fa-solid fa-heart ${
                  isInWishlist(product.ItemId) ? "text-pink-500" : ""
                }`}
                style={{ fontSize: "1.5rem" }}
              ></i>
              Wishlist
            </button>
          </div>
          <hr className="mt-6 w-[75%] hidden lg:inline-block" />
          <div className="mt-8 lg:mt-4">
            <h2 className="font-bold text-md text-[#1B2834]">BEST OFFERS</h2>
            <ul className="text-[#777C84] grid gap-2 text-sm mt-2">
              <li>
                Bank offer get 30% off on Axis Bank Credit card
                <span className="text-[#7471E5] ">T&C</span>
              </li>
              <li>
                Special offer get 25% off{" "}
                <span className="text-[#7471E5] ml-1">T&C</span>
              </li>
              <li>
                Take 3-4 Business Days
                <span className="text-[#7471E5] ml-1">T&C</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Similar />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default Product;
