import React from "react";
import backgroundImage from "../../assets/business-people-modern-office.jpg"; // Replace with your image path

const CallToAction = () => {
  return (
    <section
      className="relative bg-cover bg-center h-64 flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div> {/* Overlay */}
      <div className="relative text-center text-white">
        <h2 className="text-2xl font-bold mb-4">
          Start Growing Your Business Today
        </h2>
        <button className="bg-white text-blue-900 font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-gray-200 transition">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
