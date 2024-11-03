import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
const SuccessPage = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const item = query.get("item");
  const userId = query.get("user");

  const handleDownload = async () => {
    toast.loading("Generating Bill...");
    try {
      const response = await fetch(
        `https://devin-vogue-backend-deployment-2.onrender.com/success?item=${item}&user=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text(); // Read the error response as text
        console.error("Fetch Error Text:", errorText);
        throw new Error(`Error ${response.status}: ${errorText}`); // Include the error text in the thrown error
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      toast.dismiss();
      a.download = "bill.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.dismiss();
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your payment was processed successfully.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300"
          >
            Download Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
