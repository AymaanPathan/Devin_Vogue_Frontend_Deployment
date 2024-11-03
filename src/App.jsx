import "./index.css";
import { useEffect, useState } from "react";
import Layout from "./Components/Layout.jsx";
import Shop from "./Components/Shop/Shop.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import WishList from "./Components/Wishlist/WishList.jsx";
import ProductList from "./Components/AdminPanel/ProductList.jsx";
import MainContent from "./Components/AdminPanel/MainContent.jsx";
import CategoryMain from "./Components/ProductCategory/CategoryMain.jsx";
import Shopping from "./Components/Shopping/Shopping.jsx";
import Product from "./Components/Product/Product.jsx";
import AdminPanel from "./Components/AdminPanel/AdminPanel.jsx";
import CartItem from "./Components/Cart-Items/CartItem.jsx";
import SuccessPage from "./Components/Cart-Items/Success.jsx";
import CancelPage from "./Components/Cart-Items/Cancel.jsx";
import ProfilePage from "./Components/Profile/Profile.jsx";
import Users from "./Components/AdminPanel/Users.jsx";
import BarChart from "./Components/AdminPanel/BarChart.jsx";
import PieChart from "./Components/AdminPanel/PieChart.jsx";
import LineChart from "./Components/AdminPanel/LineChart.jsx";

export default function App() {
  const [best, setBest] = useState([]);
  const [productData, setProductData] = useState({ labels: [], datasets: [] });

  const fetchBestSelling = async () => {
    try {
      const response = await fetch(
        "https://devin-vogue-backend-deployment-2.onrender.com/bestSelling",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBest(data.Data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBestSelling();
  }, [best]);

  useEffect(() => {
    setProductData({
      labels: best.map((data) => data.name),
      datasets: [
        {
          label: "Best Selling product",
          data: best.map((data) => data.sales),
          backgroundColor: [
            "#399918",
            "#06D001", // Red
            "#9BEC00", // Grey
            "#DEF9C4", // Yellow
          ],
        },
      ],
    });
  }, [best]);

  return (
    <main>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Shop />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/shop" element={<Shopping />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/:ItemID" element={<Product />} />
          <Route path="/cartItems" element={<CartItem />} />
          <Route path="/shop/:name" element={<CategoryMain />} />
          <Route path="/:user/profile" element={<ProfilePage />} />
          <Route path="/admin/addProduct" element={<MainContent />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/users" element={<Users />} />
          <Route
            path="/graphs/bar"
            element={<BarChart chartData={productData} />}
          />
          <Route
            path="/graphs/pie"
            element={<PieChart chartData={productData} />}
          />
          <Route
            path="/graphs/line"
            element={<LineChart chartData={productData} />}
          />
          <Route path="/success/" element={<SuccessPage />} />
          <Route path="/payment/cancel" element={<CancelPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </main>
  );
}
