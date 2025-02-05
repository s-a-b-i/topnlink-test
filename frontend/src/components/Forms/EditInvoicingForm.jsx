import React, { useState } from 'react';

const EditInvoicingForm = ({ onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    firstName: 'Vsl Teviškes',
    lastName: 'Alkas',
    address: 'Rygos g. 26-66, Vilnius',
    city: 'Vilnius',
    zip: '01100',
    country: 'Latvia',
    province: 'vilnius'
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          className="px-4 py-2 rounded-lg bg-[#FF5722] text-white"
        >
          Privato
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-gray-100"
        >
          Azienda
        </button>
      </div>

      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-2">
            First name
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            className="border border-gray-200 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2">
            Last name
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            className="border border-gray-200 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2">
            Address
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="border border-gray-200 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2">
            City
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
            className="border border-gray-200 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2">
            ZIP
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.zip}
            onChange={(e) => setFormData({...formData, zip: e.target.value})}
            className="border border-gray-200 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2">
            Country
            <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.country}
            onChange={(e) => setFormData({...formData, country: e.target.value})}
            className="border border-gray-200 rounded-lg p-2"
          >
            <option value="Latvia">Latvia</option>
            {/* Add other country options as needed */}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2">
            Province
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.province}
            onChange={(e) => setFormData({...formData, province: e.target.value})}
            className="border border-gray-200 rounded-lg p-2"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg bg-white border border-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-[#FF5722] text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInvoicingForm;