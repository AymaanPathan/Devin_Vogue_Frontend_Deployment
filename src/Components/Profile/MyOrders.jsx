/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "../../Context/Modal";
import toast from "react-hot-toast";
export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  const { handleBackgroundDropDown, handleBackgroundClickNav } =
    useContext(ModalContext);
  const handleMyOrders = async () => {
    toast.loading("Fetching Your Orders...");
    try {
      const response = await fetch(
        "https://devin-vogue-backend-deployment-2.onrender.com/myOrders",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.dismiss();
        setOrders(data.userItems);
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err);
      console.log(err);
    }
  };

  useEffect(() => {
    handleMyOrders();
  }, []);

  const handleClickDropDown = (e) => {
    handleBackgroundClickNav(e);
    handleBackgroundDropDown(e);
  };

  return (
    <section className="mb-12 main" onClick={handleClickDropDown}>
      {orders.length >= 1 ? (
        <h1
          onClick={handleClickDropDown}
          className="text-3xl mt-4 main font-light text-center text-gray-400 mb-6"
        >
          Your Orders
        </h1>
      ) : (
        <h1
          onClick={handleClickDropDown}
          className="text-3xl main   mt-4 font-light text-center text-gray-400 mb-6"
        >
          You Haven't Ordered Anything Yet
        </h1>
      )}
      <div className="flex flex-wrap gap-6 justify-center">
        {orders.map((item) => (
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
  );
}
