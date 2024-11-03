import { useContext, useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import banner from "./banner.png";
import { Link } from "react-router-dom";
import "./shopping.css";
import { Productcontext } from "../../Context/Product";
import { ModalContext } from "../../Context/Modal";

export default function Shopping() {
  const { products, handleSmoothScroll } = useContext(Productcontext);
  const { handleBackgroundDropDown, handleBackgroundClickNav } =
    useContext(ModalContext);
  const [click, setClick] = useState(null);
  const [second, setSecond] = useState(59);
  const [minute, setMinute] = useState(60);
  const [hour, setHour] = useState(9);

  const handleClickDropDown = (e) => {
    handleBackgroundClickNav(e);
    handleBackgroundDropDown(e);
  };

  const handleClick = (itemId) => {
    setClick(itemId);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (second > 0) {
        setSecond((prev) => prev - 1);
      } else if (minute > 0) {
        setMinute((prev) => prev - 1);
        setSecond(59);
      } else if (hour > 0) {
        setHour((prev) => prev - 1);
        setMinute(59);
        setSecond(59);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [second, minute, hour]);

  return (
    <div className="main">
      <img
        onClick={handleClickDropDown}
        className="w-full h-auto main"
        src={banner}
        alt=""
      />
      <div>
        <div className="p-4 md:p-8 main">
          <div className="grid main grid-cols-1 gap-2 lg:mb-2">
            <span className="lg:text-lg main text-sm text-start text-[#777C84] font-semibold">
              Our Featured
            </span>
            <span
              className="lg:text-2xl main text-md text-start text-[#1B2834] font-light"
              id="OurProducts"
            >
              Our Featured Products
            </span>
          </div>
          <div>
            <div className="grid main grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
              {products.map((item, i) => {
                if (item.ItemId >= 4 && item.ItemId <= 7) {
                  return (
                    <div
                      onClick={() => handleClick(item.ItemId)}
                      key={i}
                      className={`p-4 ${
                        click === item.ItemId
                          ? "border-2 shadow-2xl bg-gray-100"
                          : ""
                      } cursor-pointer md:p-6 transform transition duration-300 group relative`}
                    >
                      <img
                        className="w-full main h-auto md:h-72 rounded-md mb-4"
                        src={item.image}
                        alt={item.name}
                      />
                      <div className="text-center main">
                        <h2 className="text-[8px] main mb-2 md:text-sm text-gray-700">
                          {item.name}
                        </h2>
                        <Link
                          onClick={handleSmoothScroll}
                          to={`/${item.ItemId}`}
                          key={item.ItemId}
                          className="active:scale-95 text-sm hover:brightness-90 text-center py-2 px-4 bg-[#393D46] text-white font-bold rounded-md"
                        >
                          Visit Product
                        </Link>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>

        <div className="p-4 md:p-8 main">
          <div className="grid grid-cols-1 gap-2 lg:mb-6 main">
            <span className="lg:text-lg text-sm text-start text-[#777C84] font-semibold main">
              Our Limited
            </span>
            <span
              className="lg:text-2xl text-md text-start text-[#1B2834] font-light main"
              id="OurProducts"
            >
              Our Limited Products
            </span>
          </div>
          <div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 main">
              {products.map((item, i) => {
                if (item.ItemId >= 21 && item.ItemId <= 22) {
                  return (
                    <div
                      key={i}
                      className="p-4 md:p-6 flex flex-col lg:flex-row gap-4 lg:gap-6 rounded-md bg-[#F6F7FB] cursor-pointer transform transition duration-300 group relative main"
                    >
                      <img
                        className="w-full h-48 lg:h-auto lg:w-48 object-cover rounded-md mb-4 lg:mb-0 main"
                        src={item.image}
                        alt={item.name}
                      />
                      <div className="flex flex-col justify-between flex-grow main">
                        <div className="flex flex-col main">
                          <span className="text-gray-700 font-semibold mb-2 main">
                            {item.name}
                          </span>
                          <span className="text-xs text-gray-500 mb-4 main">
                            Limited Deals
                          </span>
                          <div className="flex justify-between mb-4 main">
                            <div className="text-center main">
                              <div className="border-2 rounded-full w-16 h-16 flex flex-col items-center justify-center main">
                                <span className="text-lg font-bold main">
                                  {hour}
                                </span>
                                <span className="text-gray-400 text-xs main">
                                  hours
                                </span>
                              </div>
                            </div>
                            <div className="text-center main">
                              <div className="border-2 rounded-full w-16 h-16 flex flex-col items-center justify-center main">
                                <span className="text-lg font-bold main">
                                  {minute}
                                </span>
                                <span className="text-gray-400 text-xs main">
                                  min
                                </span>
                              </div>
                            </div>
                            <div className="text-center main">
                              <div className="border-2 rounded-full w-16 h-16 flex flex-col items-center justify-center main">
                                <span className="text-lg font-bold main">
                                  {second}
                                </span>
                                <span className="text-gray-400 text-xs main">
                                  sec
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-start gap-3 items-center main">
                          <span className="line-through text-[#A79F9F] main">
                            ₹{item.oldPrice}
                          </span>
                          <span className="text-lg font-semibold main">
                            ₹{item.newPrice}
                          </span>
                        </div>
                        <Link
                          onClick={handleSmoothScroll}
                          to={`/${item.ItemId}`}
                          key={item.ItemId}
                          className="mt-4 text-sm active:scale-95 hover:brightness-90 text-center py-2 px-4 bg-[#393D46] text-white font-bold rounded-md main"
                        >
                          Visit Product
                        </Link>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>

        <Footer className="main" />
      </div>
    </div>
  );
}
