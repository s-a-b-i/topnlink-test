import React from 'react';
import { FiInfo } from 'react-icons/fi';
import { Popover } from '@headlessui/react';

const languageOptions = [
  { value: "United States", label: "United States" },
  { value: "China", label: "China" },
  { value: "Spain", label: "Spain" },
  { value: "India", label: "India" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "Brazil", label: "Brazil" },
  { value: "Russia", label: "Russia" },
  { value: "Japan", label: "Japan" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Germany", label: "Germany" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "South Korea", label: "South Korea" },
  { value: "France", label: "France" },
  { value: "Vietnam", label: "Vietnam" },
  { value: "Mexico", label: "Mexico" },
  { value: "Turkey", label: "Turkey" },
  { value: "Italy", label: "Italy" },
  { value: "Thailand", label: "Thailand" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Pakistan", label: "Pakistan" }
];

const mediaTypes = [
  { value: "Blog", label: "Blog" },
  { value: "Social Pages", label: "Social Pages" },
  { value: "Newspaper", label: "Newspaper" },
];

const BasicInfo = ({ formData, handleInputChange }) => {
  const tooltipContent = {
    language: "Select the primary language your content will be published in",
    mediaType: "Choose the type of media platform where content will appear",
    nofollow: "When enabled, adds a nofollow attribute to links, indicating to search engines not to pass ranking credit through these links",
    webDomain: "Enter the complete website URL where the content will be published (e.g., https://example.com)",
    mediaName: "Enter the official name of your publication, blog, or media outlet"
  };

  return (
    <div className="space-y-6">
      {/* Language */}
      <div>
        <label className="font-semibold flex items-center gap-1">
          Language <span className="text-red-500">*</span>
          <Popover className="relative">
            <Popover.Button className="focus:outline-none">
              <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
              {tooltipContent.language}
            </Popover.Panel>
          </Popover>
        </label>
        <select
          name="language"
          value={formData.language}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Select language</option>
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Media Type */}
      <div>
        <label className="font-semibold flex items-center gap-1">
          Media Type <span className="text-red-500">*</span>
          <Popover className="relative">
            <Popover.Button className="focus:outline-none">
              <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
              {tooltipContent.mediaType}
            </Popover.Panel>
          </Popover>
        </label>
        <select
          name="mediaType"
          value={formData.mediaType}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Select media type</option>
          {mediaTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Nofollow */}
      <div>
        <label className="flex items-center gap-1">
          <span className="font-semibold">Nofollow <span className="text-red-500">*</span></span>
          <Popover className="relative">
            <Popover.Button className="focus:outline-none">
              <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
              {tooltipContent.nofollow}
            </Popover.Panel>
          </Popover>
          <div className="ml-16 flex items-center gap-2">
            
            <input
              type="checkbox"
              name="nofollow"
              checked={formData.nofollow}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Yes</span>
          </div>
        </label>
      </div>

      {/* Web Domain */}
      <div>
        <label className="font-semibold flex items-center gap-1">
          Web Domain <span className="text-red-500">*</span>
          <Popover className="relative">
            <Popover.Button className="focus:outline-none">
              <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
              {tooltipContent.webDomain}
            </Popover.Panel>
          </Popover>
        </label>
        <input
          type="url"
          name="webDomain"
          value={formData.webDomain}
          onChange={handleInputChange}
          placeholder="https://example.com"
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Media Name */}
      <div>
        <label className="font-semibold flex items-center gap-1">
          Media Name <span className="text-red-500">*</span>
          <Popover className="relative">
            <Popover.Button className="focus:outline-none">
              <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
              {tooltipContent.mediaName}
            </Popover.Panel>
          </Popover>
        </label>
        <input
          type="text"
          name="mediaName"
          value={formData.mediaName}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
    </div>
  );
};

export default BasicInfo;
