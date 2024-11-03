/* eslint-disable react/prop-types */
import "./modal.css";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Modal({ closeModal }) {
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const token = localStorage.getItem("token");
  const handleClose = (e) => {
    if (e.target.classList.contains("main")) {
      closeModal();
    }
  };
  const handleChangeEmail = async () => {
    toast.loading("please wait...");
    try {
      const response = await fetch(
        "https://devin-vogue-backend-deployment-dppj.vercel.app/updateEmailByAdmin",
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            token: token,
          },
          body: JSON.stringify({ email, newEmail }),
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
    <div className="admin-modal-main  main" onClick={handleClose}>
      <div className="admin-modal-content">
        <span
          className="close-button hover:text-slate-700"
          onClick={() => closeModal()}
        >
          &times;
        </span>
        <div className=" justify-between items-center gap-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border-none outline-none"
            type="text"
            placeholder="Enter Old email"
          />
          <input
            onChange={(e) => setNewEmail(e.target.value)}
            value={newEmail}
            className="border-none outline-none"
            type="text"
            placeholder="Enter new email"
          />
          <button className="change_email_button" onClick={handleChangeEmail}>
            Change email
          </button>
        </div>
      </div>
    </div>
  );
}
