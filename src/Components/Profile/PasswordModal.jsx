/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";

const PasswordModal = ({ closePasswordModal }) => {
  const [passwordToggle, setPasswordToggle] = useState(true);
  const [newpasswordToggle, newsetPasswordToggle] = useState(true);
  const token = localStorage.getItem("token");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("modal-background")) {
      closePasswordModal();
    }
  };

  const handlePassword = async () => {
    toast.loading("Checking Password...");
    try {
      const response = await fetch(
        "https://devin-vogue-backend-deployment-2.onrender.com/updatePassword",
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            token: token,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.dismiss();
        toast.success("password changes Successfully");
        closePasswordModal();
      } else {
        toast.dismiss();
        toast.error(data.Message || "Old Password is incorrect");
      }
    } catch (err) {
      toast.error("please try again later");
      console.log(err);
    }
  };
  const togglePassoword = () => {
    setPasswordToggle(!passwordToggle);
  };
  const toggleNewPassoword = () => {
    newsetPasswordToggle(!newpasswordToggle);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        onClick={handleBackgroundClick}
        className="modal-background fixed inset-0 bg-gray-900 bg-opacity-50"
      ></div>
      <div className="modal-container bg-white p-6 rounded-lg z-50">
        <span
          onClick={() => closePasswordModal(false)}
          className=" passwordCloseMoal hover:text-slate-300 text-gray-500 cursor-pointer"
        >
          &times;
        </span>
        <div className="mb-4">
          <label htmlFor="current-password" className="block mb-1">
            Current Password
          </label>
          <div>
            <input
              id="current-password"
              type={passwordToggle ? "password" : "text"}
              placeholder="Enter your current password"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <i
              onClick={togglePassoword}
              className={`far text-sm  ${
                passwordToggle ? "fa-eye-slash" : "fa-eye"
              }  relative text-gray-400 -right-80 bottom-[34px]  cursor-pointer`}
              id="togglePassword"
            ></i>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="new-password" className="block mb-1">
            New Password
          </label>

          <input
            id="new-password"
            type={newpasswordToggle ? "password" : "text"}
            placeholder="Enter your new password"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <i
            onClick={toggleNewPassoword}
            className={`far text-sm  ${
              newpasswordToggle ? "fa-eye-slash" : "fa-eye"
            }  relative text-gray-400 -right-80 bottom-[34px]  cursor-pointer`}
            id="togglePassword"
          ></i>
        </div>
        <button
          className="w-full text-white py-2 px-4 rounded"
          onClick={handlePassword}
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default PasswordModal;
