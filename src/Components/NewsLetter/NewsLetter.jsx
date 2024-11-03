import { useState } from "react";
import { toast } from "react-hot-toast";
import women from "./women.png";

export default function NewsLetter() {
  const [email, setEmail] = useState("");

  const handleEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      return toast.error("Please Provide Email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email format is invalid");
    }
    try {
      toast.loading("Checking Email...");
      const response = await fetch(
        "https://devin-vogue-backend-deployment-2.onrender.com/sendEmail",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        toast.dismiss();
        const data = await response.json();
        toast.success("Please Check Your Email");
        console.log(data);
        setEmail("");
      } else {
        toast.dismiss();
        toast.error("Email Format Is Invalid");
      }
    } catch (err) {
      console.log(err);
      toast.error("Please Try Again Later");
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen ">
      <div className="flex flex-col md:flex-row items-center justify-center border w-full max-w-5xl bg-white shadow-lg rounded-lg px-6 py-12 md:px-8 md:py-16 md:space-x-8 space-y-8 md:space-y-0">
        {/* Left */}
        <div className="flex flex-col space-y-4 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Our Newsletter
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-tight">
            Subscribe to our newsletter for the latest news on our upcoming
            collection.
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            Get 20% off on your first order just by subscribing to our
            newsletter!
          </p>
          <div className="flex flex-col gap-2 w-full max-w-md mx-auto md:mx-0">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your business email"
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring focus:ring-gray-400 outline-none bg-gray-100 text-gray-700 placeholder-gray-500"
            />
            <button
              onClick={handleEmail}
              className="h-12 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 transition-transform transform active:scale-95"
            >
              Get started
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="md:block hidden sm:dis justify-center md:justify-end w-full md:w-auto">
          <img
            className="h-48 w-48 md:h-72 md:w-72 object-contain rounded-lg"
            src={women}
            alt="Woman"
          />
        </div>
      </div>
    </div>
  );
}
