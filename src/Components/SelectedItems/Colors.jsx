import { useContext, useState } from "react";
import { FilteredItems } from "../../Context/FilteredItems";

export default function Colors() {
  const [isColorOpen, setIsColorOpen] = useState(false);
  const { setSelectedColors, selectedColors } = useContext(FilteredItems);
  const colors = ["black", "brown", "white", "cream", "red", "blue", "All"];

  const handleColorClick = (color) => {
    setSelectedColors(color);
  };

  const handleColorDown = () => {
    setIsColorOpen(!isColorOpen);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-gray-600 font- text-md">Colors</p>
        <i
          onClick={handleColorDown}
          className={`bg-[#F1F0F0] text-xs px-2 py-1 rounded-full fa-solid fa-caret-${
            isColorOpen ? "up" : "down"
          } cursor-pointer transition-transform duration-200`}
        ></i>
      </div>
      <div className={`${isColorOpen ? "opacity-100" : "opacity-0"}`}>
        <div className="flex gap-4 mt-4">
          {colors.map((color) => (
            <span
              key={color}
              onClick={() => handleColorClick(color)}
              className={`inline-block transition-all duration-200 ease-in-out transform ${
                selectedColors === color
                  ? "scale-125 border-2 border-yellow-800 shadow-xl rotate-6"
                  : ""
              } cursor-pointer w-4 h-4 rounded-full border border-gray-600 ${
                color === "black"
                  ? "bg-black"
                  : color === "brown"
                  ? "bg-yellow-800"
                  : color === "white"
                  ? "bg-white"
                  : color === "cream"
                  ? "bg-[#FFE0B5]"
                  : color === "red"
                  ? "bg-red-600"
                  : color === "blue"
                  ? "bg-blue-600"
                  : "bg-gradient-to-t from-red-600 via-yellow-500 to-blue-600"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
