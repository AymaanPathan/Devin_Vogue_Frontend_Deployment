import { useState } from "react";
import Modal from "./modal";
import PasswordModal from "./PasswordModal";
import { Link } from "react-router-dom";

export default function Setting() {
  const userName = localStorage.getItem("name");
  const userEmail = localStorage.getItem("email");
  const userRole = localStorage.getItem("role");
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full md:w-1/2 h-full mb-12 main">
      {passwordModalOpen && (
        <PasswordModal closePasswordModal={() => setPasswordModalOpen(false)} />
      )}
      {modalOpen && <Modal closeModal={() => setModalOpen(false)} />}
      <h1 className="text-3xl mt-4 font-light text-gray-400 mb-6">
        Your Account Settings
      </h1>

      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-md font-medium text-[#1B2834] mb-1"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          value={userName}
          className="w-full outline-none bg-gray-200 focus:border-none p-3 border border-brown-300 rounded-md focus:outline-none"
          readOnly
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-md font-medium text-[#1B2834] mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="text"
          value={userEmail}
          className="w-full outline-none bg-gray-200 focus:border-none p-3 border border-brown-300 rounded-md focus:outline-none"
          readOnly
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-md font-medium [#1B2834] mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value="********"
          className="w-full outline-none bg-gray-200 focus:border-none p-3 border border-brown-300 rounded-md focus:outline-none"
          readOnly
        />
      </div>

      {userRole === "user" ? (
        <div className="flex mt-6 gap-4">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-[#1B2834] text-white text-nowrap rounded-md shadow-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500"
          >
            Change Email
          </button>
          <button
            onClick={() => setPasswordModalOpen(true)}
            className="px-4 py-2 bg-[#1B2834] text-white text-nowrap rounded-md shadow-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500"
          >
            Change Password
          </button>
        </div>
      ) : (
        <Link to={"/admin"}>
          <button className="px-4 py-2 bg-[#1B2834] text-white text-nowrap rounded-md shadow-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500">
            Go To AdminPanel
          </button>
        </Link>
      )}
    </div>
  );
}
