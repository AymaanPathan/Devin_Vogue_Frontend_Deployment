import { useState, useContext } from "react";
import Setting from "./Setting";
import MyOrders from "./MyOrders";
import Activities from "./Activities";
import { ModalContext } from "../../Context/Modal";

const ProfilePage = () => {
  const [stage, setStage] = useState(1);
  const { handleBackgroundClickNav, handleBackgroundDropDown } =
    useContext(ModalContext);

  const handleClickDropDown = (e) => {
    handleBackgroundClickNav(e);
    handleBackgroundDropDown(e);
  };

  return (
    <div className=" main w-full min-h-screen flex flex-col md:flex-row">
      <div
        onClick={handleClickDropDown}
        className="left main border  w-full md:w-64 text-left flex flex-col items-center py-8 h-auto"
      >
        <ul className="text-lg text-gray-800 flex flex-col gap-5">
          <li
            onClick={() => setStage(1)}
            className={`flex items-center gap-3 cursor-pointer py-2 px-4 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 ${
              stage === 1 ? "bg-gray-300 text-black" : "text-black"
            }`}
          >
            <i className="fa-duotone fa-solid fa-gear"></i>
            Setting
          </li>
          <li
            onClick={() => setStage(2)}
            className={`flex items-center gap-3 cursor-pointer py-2 px-4 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 ${
              stage === 2 ? "bg-gray-300 text-black" : "text-black"
            }`}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            My Orders
          </li>
          <li
            onClick={() => setStage(3)}
            className={`flex items-center gap-3 cursor-pointer py-2 px-4 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 ${
              stage === 3 ? "bg-gray-300 text-black" : "text-black"
            }`}
          >
            <i className="fa-solid fa-user"></i>
            My Activities
          </li>
        </ul>
      </div>
      <div onClick={handleClickDropDown} className="flex-1 p-6 main">
        {stage === 1 && <Setting />}
        {stage === 2 && <MyOrders />}
        {stage === 3 && <Activities />}
      </div>
    </div>
  );
};

export default ProfilePage;
