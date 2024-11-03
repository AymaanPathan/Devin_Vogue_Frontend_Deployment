import { useNavigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Cancelled
        </h2>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. Please try again or contact support if
          you need assistance.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentCancelled;
