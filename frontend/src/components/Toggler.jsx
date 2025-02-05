import React from "react";

const Toggler = ({ mode, toggleMode }) => (
  <div className="bg-white rounded-lg p-4 shadow">
    <div className="text-center mb-4">
      <p className="text-gray-700 font-semibold">Current Mode</p>
      <p className="text-lg font-bold">{mode}</p>
    </div>
    <button
      onClick={toggleMode}
      className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      Switch to {mode === "Publisher" ? "Advertiser" : "Publisher"}
    </button>
  </div>
);

export default Toggler;
