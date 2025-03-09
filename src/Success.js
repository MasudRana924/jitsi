import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircleIcon, HomeIcon } from "lucide-react";

const Success = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { duration } = state || {};

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 md:p-12 text-center max-w-md w-full">
        <CheckCircleIcon
          className="mx-auto mb-6 text-green-500"
          size={80}
          strokeWidth={1.5}
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Meeting Ended Successfully!
        </h1>
        <p>Thank you for using our telemedicine service.</p>
        {duration && <p>Meeting Duration: {duration}</p>}
        <button
          onClick={handleBackToHome}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
        >
          <HomeIcon className="mr-2" size={20} />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
