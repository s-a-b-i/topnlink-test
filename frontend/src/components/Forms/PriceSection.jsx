// components/FormSections/PriceSection.jsx
import React from 'react';
import { FiInfo } from 'react-icons/fi';
import { Popover } from '@headlessui/react';

const PriceSection = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="block font-semibold">Price *</label>
        <Popover className="relative">
          <Popover.Button className="focus:outline-none">
            <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
          </Popover.Button>
          <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
            Enter the price for your service. The minimum price allowed is 20.
          </Popover.Panel>
        </Popover>
      </div>
      <div>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Minimum price is 20"
          className="w-full border border-gray-300 rounded-md p-2"
          min="20"
          required
        />
        <div className="text-red-500 text-sm mt-1">
          The minimum price is 20
        </div>
      </div>

      {formData.price >= 10 && (
        <div className="flex space-x-8 text-sm mt-1">
          <span className="text-gray-600">
            Rankister commission: € {formData.commission.toFixed(2)}
          </span>
          <span className="text-gray-600">
            Net profit: € {formData.netProfit.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
};

export default PriceSection;
