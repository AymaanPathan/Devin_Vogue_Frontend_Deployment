/* eslint-disable react/prop-types */
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./faq.css"; // Import the CSS file

const FaqCard = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto ">
      {items.map((item, index) => (
        <div key={index} className="mb-2 bg-[#F5F8FA] mt-8">
          <button
            onClick={() => toggleItem(index)}
            className={`w-full px-6 py-6 text-lg text-green-800 ${
              openIndex !== index ? "rounded-b-xl" : ""
            } font-semibold bg-[#ffffff] rounded-t-2xl text-left focus:outline-none`}
          >
            <div className="flex items-center justify-between">
              <span>{item.title}</span>
              <i
                onClick={() => toggleItem(index)}
                className={` text-xs px-2 py-1 rounded-full fa-solid fa-caret-${
                  openIndex === index ? "up" : "down"
                } cursor-pointer transition-transform duration-200`}
              ></i>
            </div>
          </button>
          <CSSTransition
            in={openIndex === index}
            timeout={300}
            classNames="faq-content"
            unmountOnExit
          >
            <div className="px-4 py-2 bg-white border-b-2 rounded-b-xl text-gray-500">
              {item.content}
            </div>
          </CSSTransition>
        </div>
      ))}
    </div>
  );
};

export default FaqCard;
