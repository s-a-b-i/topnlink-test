import React, { useState, useEffect } from "react";
import { FiInfo } from "react-icons/fi";
import { FaCalendar } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { Popover } from "@headlessui/react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import Select from 'react-select';
import { websiteService } from "../../utils/services";
import { useAuthStore } from "../../store/authStore";
import "react-datepicker/dist/react-datepicker.css";

const PromoForm = ({ onSubmit, onCancel, initialData, existingPromoWebsites = [] }) => {
  const [formData, setFormData] = useState({
    promoName: initialData?.promoName || "",
    startDate: initialData?.startDate || new Date(),
    endDate: initialData?.endDate || null,
    products: initialData?.products || [], 
    discount: initialData?.discount || 20,
  });

  const [approvedWebsites, setApprovedWebsites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useAuthStore((state) => state.user);
  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      fetchWebsites(userId);
    } else {
      console.warn("User ID not found. Cannot fetch approved websites.");
    }
  }, [userId]);

  const fetchWebsites = async (userId) => {
    try {
      setIsLoading(true);
      const websites = await websiteService.getWebsitesApproved(userId);
      const websiteOptions = websites.map(website => ({
        value: website._id,
        label: website.webDomain,
        isDisabled: existingPromoWebsites.includes(website._id)
      }));
      setApprovedWebsites(websiteOptions);
      setError(null);
    } catch (err) {
      setError("Failed to fetch approved websites");
      toast.error("Failed to fetch approved websites");
      console.error("Error fetching websites:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.promoName || !formData.startDate || !formData.endDate || !formData.products.length) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  // Tooltip component
  const Tooltip = ({ text }) => (
    <Popover className="relative">
      <Popover.Button className="text-gray-400 focus:outline-none">
        <FiInfo className="w-4 h-4 ml-1" />
      </Popover.Button>
      <Popover.Panel className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md p-2 text-sm text-gray-600">
        {text}
      </Popover.Panel>
    </Popover>
  );

  // Custom date input component
  const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => {
    const formattedValue = value
      ? format(new Date(value), "dd/MM/yyyy hh:mm a")
      : "";

    return (
      <div className="relative">
        <input
          ref={ref}
          value={formattedValue}
          onClick={onClick}
          placeholder={placeholder || "dd/mm/yyyy --:-- --"}
          className="w-full border border-gray-300 rounded-lg p-2 pr-10 focus:outline-none focus:border-blue-500 cursor-pointer"
          readOnly
        />
        <FaCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    );
  });

  return (
    <div className="max-w-3xl p-6 rounded-lg space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Promo Name */}
          <div className="flex flex-col">
            <label className="flex items-center mb-1 text-sm font-medium text-gray-700">
              Promo name <span className="text-red-500 ml-1">*</span>
              <Tooltip text="Enter the name of the promotion." />
            </label>
            <input
              type="text"
              value={formData.promoName}
              onChange={(e) =>
                setFormData({ ...formData, promoName: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Start Date */}
          <div className="flex flex-col">
            <label className="flex items-center mb-1 text-sm font-medium text-gray-700">
              Start date <span className="text-red-500 ml-1">*</span>
              <Tooltip text="Specify when the promotion begins." />
            </label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) =>
                setFormData({ ...formData, startDate: date })
              }
              showTimeSelect
              dateFormat="Pp"
              customInput={
                <CustomInput placeholder="dd/mm/yyyy --:-- --" />
              }
              required
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <label className="flex items-center mb-1 text-sm font-medium text-gray-700">
              End date <span className="text-red-500 ml-1">*</span>
              <Tooltip text="Specify when the promotion ends." />
            </label>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) =>
                setFormData({ ...formData, endDate: date })
              }
              showTimeSelect
              dateFormat="Pp"
              customInput={
                <CustomInput placeholder="dd/mm/yyyy --:-- --" />
              }
              required
            />
          </div>

          {/* Websites */}
          <div className="flex flex-col">
          <label className="flex items-center mb-1 text-sm font-medium text-gray-700">
            Websites <span className="text-red-500 ml-1">*</span>
          </label>
          {isLoading ? (
            <div className="text-sm text-gray-500">Loading websites...</div>
          ) : error ? (
            <div className="text-sm text-red-500">{error}</div>
          ) : (
            <Select
      isMulti
      options={approvedWebsites}
      value={approvedWebsites.filter(website => 
        formData.products.includes(website.value)
      )}
      onChange={(selectedOptions) => {
        setFormData({ 
          ...formData, 
          products: selectedOptions.map(option => option.value)
        });
      }}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder="Select websites..."
      required
    />
          )}
        </div>

          {/* Discount */}
          <div className="flex flex-col">
            <label className="flex items-center mb-1 text-sm font-medium text-gray-700">
              Discount <span className="text-red-500 ml-1">*</span>
              <Tooltip text="Specify the discount percentage for the promotion." />
            </label>
            <input
              type="number"
              value={formData.discount}
              onChange={(e) =>
                setFormData({ ...formData, discount: Number(e.target.value) })
              }
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              min="0"
              max="100"
              required
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            {initialData ? "Update promo" : "Create promo"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="border bg-foundations-secondary border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromoForm;