import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { Productcontext } from "../../Context/Product";
import { Link } from "react-router-dom";
import "./adminPanel.css";

export default function MainContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectGraphs, setSelectGraphs] = useState("");

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };
  const [ItemId, setItemId] = useState();
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productOldPrice, setProductOldPrice] = useState();
  const [productNewPrice, setProductNewPrice] = useState();
  const [color, setColor] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("Select image");
  const { fetchProducts } = useContext(Productcontext);
  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0]?.name);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("productImage", file);

    try {
      toast.loading("checking File...");
      const response = await fetch(
        "https://devin-vogue-backend-deployment-dppj.vercel.app/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.dismiss();
        const data = await response.json();
        setImageUrl(data.imageUrl);
        toast.success("File uploaded successfully");
      } else {
        toast.dismiss();
        toast.error("Failed to upload file");
      }
    } catch (error) {
      toast.error("Error uploading file");
    }
  };

  const handleAddProduct = async () => {
    if (
      !ItemId ||
      ItemId <= 0 ||
      !productCategory ||
      !productDescription ||
      !productOldPrice ||
      !productNewPrice ||
      !color ||
      isNaN(productOldPrice) ||
      isNaN(productNewPrice)
    ) {
      toast.error("All fields are required and must be valid.");
      return;
    }

    try {
      const response = await fetch(
        "https://devin-vogue-backend-deployment-dppj.vercel.app/AddProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            ItemId: parseInt(ItemId, 10),
            name: productName,
            image: imageUrl,
            category: productCategory,
            description: productDescription,
            oldPrice: parseFloat(productOldPrice),
            newPrice: parseFloat(productNewPrice),
            color: color,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product.");
      }

      const result = await response.json();
      toast.success(`Product ${result.product.name} added successfully!`);
      fetchProducts();
      resetForm();
    } catch (error) {
      toast.error("Failed to add product.");
    }
  };

  const resetForm = () => {
    setItemId(0);
    setProductName("");
    setProductCategory("");
    setProductDescription("");
    setProductOldPrice(0);
    setProductNewPrice(0);
    setColor("");
    setFile(null);
    setFileName("Select image");
    setImageUrl("");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col md:flex-row mx-auto w-full bg-white rounded-lg shadow-md">
      <div className=" border text-black flex flex-col md:flex-shrink-0 h-64 md:h-auto md:w-64 overflow-y-auto">
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

      {/* Form Container */}
      <div className="flex-1 px-4 py-6 space-y-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="itemId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Item ID
            </label>
            <input
              value={ItemId}
              onChange={(e) => setItemId(e.target.value)}
              type="number"
              id="itemId"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter item ID..."
            />
          </div>

          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Name
            </label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              type="text"
              id="productName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter product name..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="productCategory"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Category
            </label>
            <input
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              type="text"
              id="productCategory"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter product category..."
            />
          </div>

          <label
            htmlFor="productImage"
            className="block text-sm font-medium text-gray-700"
          >
            Product Image
          </label>
          <div className="flex h-12 gap-4 items-center">
            <div className="flex items-center space-x-4">
              <label
                htmlFor="productImage"
                className="flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm cursor-pointer bg-white text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {fileName}
                <input
                  type="file"
                  id="productImage"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upload
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="productDescription"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Description
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              id="productDescription"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter product description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="productOldPrice"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Old Price
              </label>
              <input
                value={productOldPrice}
                onChange={(e) => setProductOldPrice(e.target.value)}
                type="number"
                id="productOldPrice"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter old price..."
              />
            </div>
            <div>
              <label
                htmlFor="productNewPrice"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Price
              </label>
              <input
                value={productNewPrice}
                onChange={(e) => setProductNewPrice(e.target.value)}
                type="number"
                id="productNewPrice"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter new price..."
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Color
            </label>
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type="text"
              id="color"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter color..."
            />
          </div>

          {/* Button to add product */}
          <div className="flex justify-center">
            <button
              onClick={handleAddProduct}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
