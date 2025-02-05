import React from "react";

const ViewToggle = ({ viewMode, setViewMode }) => {
  return (
    <section className="py-4 text-center">
      <button
        className={`px-4 py-2 rounded-l-md ${
          viewMode === "grid" ? "bg-[#7091E6] text-white" : "bg-gray-200"
        }`}
        onClick={() => setViewMode("grid")}
      >
        Grid View
      </button>
      <button
        className={`px-4 py-2 rounded-r-md ${
          viewMode === "list" ? "bg-[#7091E6] text-white" : "bg-gray-200"
        }`}
        onClick={() => setViewMode("list")}
      >
        List View
      </button>
    </section>
  );
};

export default ViewToggle;