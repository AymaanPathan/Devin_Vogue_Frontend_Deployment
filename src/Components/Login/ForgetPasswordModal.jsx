/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";

const ForgotPasswordModal = ({ setShowForgotPasswordModal }) => {
  const [forgotEmail, setForgotEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [stage, setStage] = useState(1);

  const requestToken = async () => {
    if (forgotEmail === "") {
      return toast.error("Please Provide a Valid Email");
    }
    try {
      toast.loading("Sending Token...");
      const response = await fetch(
        "https://devin-vogue-backend-deployment-2.onrender.com/forgetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email: forgotEmail }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.dismiss();
        toast.success("Token Sent to Your Email");
        setStage(2);
      } else {
        toast.dismiss();
        toast.error(data.Message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An Error Occurred");
    }
  };

  const resetPassword = async () => {
    if (token === "" || newPassword === "") {
      return toast.error("Please Provide the Token and New Password");
    }
    try {
      toast.loading("Checking Token...");
      const response = await fetch(
        `https://devin-vogue-backend-deployment-2.onrender.com/resetPassword/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.dismiss();
        toast.success("Password Reset Successful");
        setShowForgotPasswordModal(false);
        setStage(1);
        setForgotEmail("");
        setToken("");
        setNewPassword("");
      } else {
        toast.dismiss();
        toast.error(data.Message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An Error occurred Please try again later");
    }
  };
  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("main")) {
      setShowForgotPasswordModal(false);
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed main inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        {stage === 1 ? (
          <>
            <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                type="email"
                placeholder="Email Address"
              />
            </div>
            <button
              onClick={requestToken}
              className="w-full mt-4 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
            >
              Send Token
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Token
              </label>
              <input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                type="text"
                placeholder="Enter Token"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                type="password"
                placeholder="New Password"
              />
            </div>
            <button
              onClick={resetPassword}
              className="w-full mt-4 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
            >
              Reset Password
            </button>
          </>
        )}
        <button
          onClick={() => {
            setShowForgotPasswordModal(false);
            setStage(1);
            setForgotEmail("");
            setToken("");
            setNewPassword("");
          }}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
