/* eslint-disable react/prop-types */
import "./dropdown.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DropDown() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const navigate = useNavigate();
  const deleteToken = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    toast.success("Logout successful");
    navigate("/");
  };

  return (
    <div className="dropdownProfile flex lg:flex-col">
      <ul className="lg:flex">
        <li>
          {token ? (
            <p className="px-6 whitespace-nowrap text-white  shadow-2xl hover:scale-90 duration-200 bg-[#000000]">
              Welcome, {name}
            </p>
          ) : (
            <Link to={"/register"}>Signup</Link>
          )}
        </li>
        <li>
          {token ? (
            <div className="flex items-center gap-4">
              <Link
                to={`/${name}/profile`}
                className="px-4 text-nowrap text-white shadow-2xl hover:scale-90 duration-200  bg-[#5b3d35]"
              >
                My Profile
              </Link>
              <p
                className="px-4 text-white shadow-2xl hover:scale-90 duration-200  bg-red-600"
                onClick={deleteToken}
              >
                Logout
              </p>
            </div>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </li>
      </ul>
    </div>
  );
}
