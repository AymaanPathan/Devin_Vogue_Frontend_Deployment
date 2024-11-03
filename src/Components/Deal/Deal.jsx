/* eslint-disable react/jsx-key */
import { useContext } from "react";
import star from "./star.png";
import "./deal.css";
import { Productcontext } from "../../Context/Product";

export default function Deal() {
  const { products } = useContext(Productcontext);

  return (
    <div className="deal_head_main mt-24 p-8">
      <div className="grid grid-cols-1 gap-2 lg:mb-6">
        <span className="lg:text-lg text-sm text-start text-[#777C84] font-semibold">
          Today Deals
        </span>
        <span
          className="lg:text-2xl text-md text-start text-[#1B2834] font-light"
          id="OurProducts"
        >
          Deals of the Day
        </span>
      </div>
      <div className="deal__main mt-8">
        {products.map((item, i) => {
          if (item.ItemId >= 22 && item.ItemId <= 24) {
            return (
              <div key={i} className="deal__item">
                <div className="w-fit h-full rounded-lg shadow">
                  <a href={`/${item.ItemId}`}>
                    <img
                      className="deal-imgs h-96 rounded-t-lg"
                      src={item.image}
                      alt=""
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-xl text-left tracking-tight text-gray-900">
                        {item.name}
                      </h5>
                    </a>
                    <div className="flex items-center mb-3 justify-start gap-2">
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        Zara
                      </p>
                      <p className="text-gray-500">4.0</p>
                      <img className="w-4 h-4" src={star} alt="" />
                    </div>
                    <div className="flex justify-start gap-4 items-center">
                      <p className="font-bold text-lg">Rs. {item.newPrice}</p>
                      <p className="font-extralight text-gray-500 text-lg line-through">
                        Rs. {item.oldPrice}
                      </p>
                      <p className="text-green-600 font-semibold">(30% off)</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
