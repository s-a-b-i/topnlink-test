// src/pages/Publisher/Deposit.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Deposit = () => {
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "",
    invoicingAccount: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = () => {
    return (
      formData.amount >= 20 &&
      formData.paymentMethod !== "" &&
      formData.invoicingAccount !== ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // Handle deposit submission
      console.log("Form submitted:", formData);
    }
  };


const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Deposit</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Amount Input */}
        <div>
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            placeholder="0"
            min="20"
          />
          <span className="text-red-500 text-sm">Minimum amount is 20,00</span>
        </div>

        {/* Payment Method Dropdown */}
        <div>
          <label className="block text-gray-700 mb-2">
            Payment method<span className="text-red-500">*</span>
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">Select payment method</option>
            <option value="paypal">PayPal</option>
            <option value="creditCard">Credit Card</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
        </div>

        {/* Invoicing Account Dropdown */}
        <div>
          <label className="block text-gray-700 mb-2">
            Invoicing account<span className="text-red-500">*</span>
          </label>
          <select
            name="invoicingAccount"
            value={formData.invoicingAccount}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">Select invoicing account</option>
            <option value="personal">Personal Account</option>
            <option value="business">Business Account</option>
          </select>
        </div>

        {/* Company Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">RANKISTER Srl</h3>
          <p>Via Cristoforo Colombo 2 - 10024 - Moncalieri (TO)</p>
          <p>P.iva 12684530012 - C.F. 12684530012</p>
          <p>SDI: M5UXCR1</p>
        </div>

        {/* Submit Button */}
        <div>
            
        <button 
      onClick={() => navigate('/balance/deposit')}
      className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
    >
      Deposit
    </button>

        </div>
      </form>

      {/* Footer Links */}
      <div className="flex gap-2 text-[#3D52A0]">
        <Link to="/terms" className="hover:underline">
          Terms and conditions
        </Link>
        <span>•</span>
        <Link to="https://rankister.com" className="hover:underline">
          Rankister.com
        </Link>
      </div>
    </div>
  );
};

export default Deposit;