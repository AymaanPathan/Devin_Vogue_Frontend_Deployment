import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectGraphs, setSelectGraphs] = useState("");

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" border text-black flex flex-col md:flex-shrink-0 h-64 md:h-auto md:w-64 overflow-y-auto">
      {/* Set height for mobile and overflow */}
      <div className="p-4">
        <h2 className="text-xl text-center font-semibold">Admin Panel</h2>
        <ul className="mt-4">
          <li className="py-2 text-center hover:bg-gray-200 cursor-pointer">
            <Link to="/admin/addProduct">Add Product</Link>
          </li>
          <li className="py-2 text-center hover:bg-gray-200 cursor-pointer">
            <Link to="/admin/products">Products List</Link>
          </li>
          <li className="py-2 text-center hover:bg-gray-200 cursor-pointer">
            <Link to="/admin/users">Users Setting</Link>
          </li>
          <li
            onClick={handleDropDown}
            className="py-2 flex items-center justify-center gap-4 text-center hover:bg-gray-200 cursor-pointer"
          >
            <i className={`fa-solid fa-caret-${isOpen ? "down" : "up"}`}></i>
            <p>Graphs</p>
          </li>
          <div
            className={`transition-all duration-300 ease-in-out ${
              isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <Link to="/graphs/bar">
              <li
                onClick={() => setSelectGraphs("bar")}
                className={`py-2 ${
                  selectGraphs === "bar" ? "bg-white text-black" : ""
                } text-center hover:bg-gray-200 cursor-pointer`}
              >
                Bar
              </li>
            </Link>
            <Link to="/graphs/pie">
              <li
                onClick={() => setSelectGraphs("pie")}
                className={`py-2 ${
                  selectGraphs === "pie" ? "bg-white text-black" : ""
                } text-center hover:bg-gray-200 cursor-pointer`}
              >
                Pie
              </li>
            </Link>
            <Link to="/graphs/line">
              <li
                onClick={() => setSelectGraphs("line")}
                className={`py-2 ${
                  selectGraphs === "line" ? "bg-white text-black" : ""
                } text-center hover:bg-gray-200 cursor-pointer`}
              >
                Line
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
