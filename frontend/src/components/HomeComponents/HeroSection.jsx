// components/HomeComponents/HeroSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../store/authStore"; // Add this import
import businessWomanImage from "../../assets/business-woman.jpg";

const HeroSection = () => { // Remove setIsAuthenticated prop
  const navigate = useNavigate();
  // const { setIsAuthenticated } = useAuthStore(); // Add this hook

  const handleSignUp = () => {
    navigate("/signup"); // Change to navigate to signup page instead of direct authentication
  };

  const handleViewPricing = () => {
    // Add pricing view logic here
    console.log("View pricing clicked");
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center min-h-screen bg-cover bg-center px-4 overflow-hidden"
      style={{
        backgroundImage: `url(${businessWomanImage})`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-blue/30 p-3 rounded-lg">
          Premium Guest Posting <span className="text-yellow-400">Services</span>
        </h1>
        <p className="text-xl md:text-3xl font-bold mb-4 bg-blue/30 p-3 rounded-lg">
          Get <span className="text-yellow-400">Backlinks</span> From High-Quality Websites
        </p>
        <p className="text-xl md:text-2xl mb-4 bg-blue/30 p-3 rounded-lg">
          Only Pay If You Are Satisfied With The Results
        </p>
        <div className="space-x-4 mb-4">
          <button
            onClick={handleSignUp}
            className="px-4 py-2 text-sm bg-white rounded-lg text-black border-2 border-transparent hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl font-bold"
          >
            Sign Up Now
          </button>
          <button 
            onClick={handleViewPricing}
            className="px-4 py-2 text-sm bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl font-bold"
          >
            View Pricing
          </button>
        </div>
        <p className="text-sm md:text-md font-bold text-white mt-4 bg-blue/30 p-2 rounded-lg">
          <span className="text-yellow-400">* </span>Starting From{" "}
          <span className="text-yellow-400">$4.99</span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;