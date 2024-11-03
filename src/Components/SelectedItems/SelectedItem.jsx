/* eslint-disable react/prop-types */
import { useState, useContext, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { FilteredItems } from "../../Context/FilteredItems";
import Colors from "./Colors";
import bag from "./shopping-bag.png";
import "./select.css";
import { ModalContext } from "../../Context/Modal";
import { Productcontext } from "../../Context/Product";

export default function SelectedItem({ selectedItems }) {
  const { handleSmoothScroll } = useContext(Productcontext);
  const [isOpen, setIsOpen] = useState(false);
  const [radioChecked, setRadioChecked] = useState(4);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isRangeOpen, setIsRangeOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [noItemsFound, setNoItemsFound] = useState(false);

  const { setSelectedItems } = useContext(FilteredItems);
  const { selectedColors } = useContext(FilteredItems);
  const { handleBackgroundClickNav } = useContext(ModalContext);
  const { name } = useParams();

  const categoryItems = useMemo(
    () => [
      "jeans",
      "Jacket",
      "Shirt",
      "T-shirt",
      "Sweatshirt",
      "Panty",
      "Shorts",
      "Dress",
      "All",
    ],
    []
  );

  const handleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
  const handleSortOpen = useCallback(() => setIsSortOpen((prev) => !prev), []);
  const handleRangeOpen = useCallback(
    () => setIsRangeOpen((prev) => !prev),
    []
  );
  const handleItems = useCallback(
    (e) => {
      setIsOpen(false);
      setSelectedItems(e.target.textContent);
    },
    [setSelectedItems]
  );

  const handlePriceRangeChange = useCallback((e) => {
    const { value, checked } = e.target;
    setSelectedPriceRanges((prevRange) =>
      checked
        ? [...prevRange, value]
        : prevRange.filter((range) => range !== value)
    );
  }, []);

  const fetchProducts = useCallback(
    async (category) => {
      try {
        const response = await fetch(
          `https://devin-vogue-backend-deployment-dppj.vercel.app/${category}?page=${currentPage}&limit=${10}`
        );
        if (response.ok) {
          const data = await response.json();
          setTotalPage(data.totalPage);
          setProducts(data.Data);

          if (data.Data.length === 0 && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
          } else if (data.Data.length === 0 && currentPage === 1) {
            setNoItemsFound(true);
          } else {
            setNoItemsFound(false);
          }
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    [currentPage]
  );

  const newFilteredItems = useMemo(
    () =>
      products
        .filter((item) => {
          const searchMatch = item.name
            .toLowerCase()
            .includes(searchInput.toLowerCase());
          const itemMatchesSelected =
            selectedItems === "All" ||
            item.name.toLowerCase().includes(selectedItems.toLowerCase());
          const colorMatchesSelected =
            selectedColors === "All" ||
            item.color.toLowerCase() === selectedColors.toLowerCase();
          const priceMatchRange =
            selectedPriceRanges.length === 0 ||
            selectedPriceRanges.some((range) => {
              const [min, max] = range.split("-").map(Number);
              return item.newPrice >= min && item.newPrice <= max;
            });
          return (
            itemMatchesSelected &&
            colorMatchesSelected &&
            searchMatch &&
            priceMatchRange
          );
        })
        .sort((a, b) => {
          if (radioChecked === 1) {
            return a.newPrice - b.newPrice;
          } else if (radioChecked === 2) {
            return b.newPrice - a.newPrice;
          } else if (radioChecked === 3) {
            return b.sales - a.sales;
          } else {
            return 0;
          }
        }),
    [
      products,
      searchInput,
      selectedItems,
      selectedColors,
      selectedPriceRanges,
      radioChecked,
    ]
  );

  useEffect(() => {
    if (name === "men") {
      fetchProducts("men");
    } else {
      fetchProducts("women");
    }
  }, [fetchProducts, name, currentPage]);

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
    handleSmoothScroll();
  };
  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
    handleSmoothScroll();
  };

  return (
    <div
      onClick={handleBackgroundClickNav}
      className="flex main flex-col lg:flex-row justify-center gap-10"
    >
      <div className="mb-8 h-fit w-full lg:w-96 border border-gray-300 p-6 rounded-lg shadow-lg">
        <div>
          <h2 className="font-bold text-[#7F493F] text-lg mb-2">Filters</h2>
        </div>
        <div className={`transition-opacity duration-500 `}>
          <hr className="" />
        </div>
        <div className="mb-6 mt-2">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-md">Search</p>
          </div>
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            value={searchInput}
            className="w-full py-2 px-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F493F]"
            placeholder="Search..."
          />
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-md">Sort By</p>
            <i
              onClick={handleSortOpen}
              className={`bg-[#F1F0F0] text-xs px-2 py-1 rounded-full fa-solid fa-caret-${
                isSortOpen ? "up" : "down"
              } cursor-pointer transition-transform duration-200`}
            ></i>
          </div>
          <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
              isSortOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-start gap-4">
                <input
                  type="radio"
                  className="custom-radio"
                  onChange={() => setRadioChecked(1)}
                  checked={radioChecked === 1}
                />
                <p>Price - Low to high</p>
              </div>
              <div className="flex items-center justify-start gap-4">
                <input
                  type="radio"
                  className="custom-radio"
                  onChange={() => setRadioChecked(2)}
                  checked={radioChecked === 2}
                />
                <p>Price - High to low</p>
              </div>
              <div className="flex items-center justify-start gap-4">
                <input
                  type="radio"
                  className="custom-radio"
                  onChange={() => setRadioChecked(3)}
                  checked={radioChecked === 3}
                />
                <p>Popular</p>
              </div>
              <div className="flex items-center justify-start gap-4">
                <input
                  type="radio"
                  className="custom-radio"
                  onChange={() => setRadioChecked(4)}
                  checked={radioChecked === 4}
                />
                <p>All</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-md">Price Range</p>
            <i
              onClick={handleRangeOpen}
              className={`bg-[#F1F0F0] text-xs px-2 py-1 rounded-full fa-solid fa-caret-${
                isRangeOpen ? "up" : "down"
              } cursor-pointer transition-transform duration-200`}
            ></i>
          </div>
          <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
              isRangeOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-2">
              <label className="block">
                <input
                  onChange={handlePriceRangeChange}
                  type="checkbox"
                  value="500-1000"
                  className="mr-2 cursor-pointer"
                />
                500 - 1000
              </label>
              <label className="block">
                <input
                  onChange={handlePriceRangeChange}
                  type="checkbox"
                  value="1000-2000"
                  className="mr-2 cursor-pointer"
                />
                1000 - 2000
              </label>
              <label className="block">
                <input
                  onChange={handlePriceRangeChange}
                  type="checkbox"
                  value="2000-4000"
                  className="mr-2 cursor-pointer"
                />
                2000 - 4000
              </label>
              <label className="block">
                <input
                  onChange={handlePriceRangeChange}
                  type="checkbox"
                  value="4000-6000"
                  className="mr-2 cursor-pointer"
                />
                4000 - 6000
              </label>
              <label className="block">
                <input
                  onChange={handlePriceRangeChange}
                  type="checkbox"
                  value="6000-8000"
                  className="mr-2 cursor-pointer"
                />
                6000 - 8000
              </label>
              <label className="block">
                <input
                  onChange={handlePriceRangeChange}
                  type="checkbox"
                  value="8000-10000"
                  className="mr-2 cursor-pointer"
                />
                8000 -10000
              </label>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-md">Category</p>
            <i
              onClick={handleOpen}
              className={`bg-[#F1F0F0] text-xs px-2 py-1 rounded-full fa-solid fa-caret-${
                isOpen ? "up" : "down"
              } cursor-pointer transition-transform duration-200`}
            ></i>
          </div>
          <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
              isOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-2">
              <ul className="text-md text-gray-600 grid gap-2">
                {categoryItems.map((item, index) => (
                  <li
                    key={index}
                    onClick={handleItems}
                    className={`${
                      selectedItems === item
                        ? "text-amber-800 font-semibold"
                        : ""
                    } hover:text-yellow-800 cursor-pointer`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <Colors />
        </div>
      </div>
      <div className="w-full">
        {noItemsFound ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-600 text-lg">No items found</p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-1 lg:grid-cols-3  md:grid-cols-2 gap-12">
              {newFilteredItems.map((item, i) =>
                item.category === name ? (
                  <div
                    key={i}
                    className="h-full border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 relative group"
                  >
                    <Link onClick={handleSmoothScroll} to={`/${item.ItemId}`}>
                      <div className="relative">
                        <img
                          className="w-full h-72 object-cover rounded-md mb-4 transition-transform duration-500"
                          src={item.image}
                          alt={item.name}
                        />
                        <div className="absolute inset-0 bg-white bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center rounded-md">
                          <span className="text-[#774000] text-lg font-extraLight">
                            Visit Product
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="grid grid-cols-1 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.name}</span>
                        <img
                          src={bag}
                          className="w-8 h-8 rounded-lg cursor-pointer active:scale-75 transition-transform duration-150 p-2 border"
                          alt=""
                        />
                      </div>
                      <div className="flex items-center justify-between gap-8 mt-2">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-bold text-green-600">
                            ₹{item.newPrice}
                          </span>
                          <span className="line-through text-sm text-gray-500">
                            ₹{item.oldPrice}
                          </span>
                        </div>
                        <span className="text-sm text-red-600 font-semibold">
                          55% OFF
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#7F493F] text-white"
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPage}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === totalPage
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#7F493F] text-white"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
