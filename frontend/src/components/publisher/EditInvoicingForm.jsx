import React, { useState } from "react";
import { toast } from "react-hot-toast";

const EditInvoicingForm = ({ onCancel, onSave, initialData = {}, userId }) => {
  const [isAgency, setIsAgency] = useState(initialData.accountType === 'business');
  const [formData, setFormData] = useState({
    accountType: initialData.accountType || 'personal',
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    address: initialData.address || "",
    city: initialData.city || "",
    zip: initialData.zip || "",
    country: initialData.country || "",
    province: initialData.province || "",
    vatNumber: initialData.vatNumber || "",
    organizationName: initialData.organizationName || "",
    userId
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      accountType: isAgency ? 'business' : 'personal'
    };
    onSave(submitData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex gap-4">
        <button
          type="button"
          className={`px-4 py-2 rounded-md ${!isAgency ? "bg-foundations-primary text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setIsAgency(false)}
        >
          Personal
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-md ${isAgency ? "bg-foundations-primary text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setIsAgency(true)}
        >
          Business
        </button>
      </div>

      {!isAgency && (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">First name*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Last name*</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              required
            />
          </div>
        </div>
      )}

      {isAgency && (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Organization Name*</label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">VAT Number*</label>
            <input
              type="text"
              name="vatNumber"
              value={formData.vatNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              required
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Address*</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">City*</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">ZIP*</label>
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Country*</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            required
          >
            <option value="">Select country</option>
            <option value="Latvia">Latvia</option>
            <option value="Lithuania">Lithuania</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Province*</label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-foundations-primary text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditInvoicingForm;