import { useContext, useState } from "react";
import { Productcontext } from "../../Context/Product";
import { Link } from "react-router-dom";

function ProductList() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectGraphs, setSelectGraphs] = useState("");

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };
  const { products, deleteProduct } = useContext(Productcontext);

  return (
    <div className="flex flex-col md:flex-row">
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

      <div className="p-4 flex-1">
        <h2 className="text-3xl font-semibold mb-8 text-center text-indigo-600">
          Products List
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length <= 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <p className="text-sm font-semibold mb-2">{product.name}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 line-through">
                      Rs.{product.oldPrice}
                    </span>
                    <span className="text-indigo-600 font-bold">
                      Rs.{product.newPrice}
                    </span>
                    <button
                      onClick={() => deleteProduct(product.ItemId)}
                      className="bg-red-600 text-white px-2 py-2 hover:brightness-110 duration-150 text-xs rounded-md mr-2"
                    >
                      Remove Product
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            to="/admin/addProduct"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
