/* eslint-disable react/prop-types */
import "./Modal.css";
import { useState } from "react";
import toast from "react-hot-toast";

const Modal = ({ closeModal }) => {
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("modal-background")) {
      closeModal();
    }
  };

  const handleChangeEmail = async () => {
    toast.loading("please wait...");
    try {
      const response = await fetch(
        "https://devin-vogue-backend-deployment-2.onrender.com/updateEmail",
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            token: token,
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        toast.dismiss();
        toast.error(data.Message);
      } else {
        toast.dismiss();
        toast.success(data.Message);
        localStorage.setItem("email", data.Data.email);
        closeModal();
      }
    } catch (err) {
      toast.error("Email not changed internal error");
      console.log(err);
    }
  };

  return (
    <div className="modal-background" onClick={handleBackgroundClick}>
      <div className="modal-container">
        <span
          className="close-button hover:text-slate-700"
          onClick={closeModal}
        >
          &times;
        </span>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your new email"
            id="email"
          />
          <button onClick={handleChangeEmail}>Change Email</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
