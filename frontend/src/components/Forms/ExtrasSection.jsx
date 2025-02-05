// components/FormSections/ExtrasSection.jsx
import React from "react";

const ExtrasSection = ({
  extras,
  handleAddExtra,
  handleRemoveExtra,
  handleExtraChange,
}) => {
  return (
    <div>
      <div>
        <div className="flex items-center gap-2">
          <label className="font-semibold">Extra</label>
        </div>
        <div className="text-red-500 text-sm">
          It is not permitted to include editorial services
        </div>

        {extras.map((extra, index) => (
          <div key={index} className="flex gap-4 mt-2">
            <select
              value={extra.select}
              onChange={(e) =>
                handleExtraChange(index, "select", e.target.value)
              }
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select an option</option>
              <option value="gambling">Gambling</option>
              <option value="adult">Adult</option>
              <option value="cbd">CBD</option>
              <option value="trading">Trading</option>
            </select>
            <input
              type="text"
              placeholder="Price"
              value={extra.price}
              onChange={(e) =>
                handleExtraChange(index, "price", e.target.value)
              }
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <button
              type="button"
              onClick={() => handleRemoveExtra(index)}
              className="text-red-500 text-xl"
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddExtra}
          className="mt-4 text-black flex items-center gap-2"
        >
          <span>+</span> Add Extra
        </button>
      </div>
    </div>
  );
};

export default ExtrasSection;
