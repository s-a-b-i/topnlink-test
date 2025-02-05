import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToApproveList from "../../components/publisher/ToApproveList";
import ApprovedList from "../../components/publisher/ApprovedList"; // Import the ApprovedList component

const Products = ({ toggleMode }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('approved'); // Default to "approved" tab

  const handleProductsClick = async () => {
    toggleMode();
    setTimeout(() => {
      navigate('/advertiser/catalogue');
    }, 0);
  };

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-foundations-dark">Products</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <Link
            to="/publisher/products/add"
            className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity text-center"
          >
            Add Website / Fanpage
          </Link>
          <button
            onClick={handleProductsClick}
            className="bg-foundations-secondary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
          >
            My products
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search by Domain name / Social..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-foundations-primary"
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-4">
        <button 
          className={`px-4 sm:px-6 py-2 rounded-lg flex-grow sm:flex-grow-0 ${
            activeTab === 'approved' 
              ? 'bg-foundations-primary text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('approved')}
        >
          Approved
        </button>
        <button 
          className={`px-4 sm:px-6 py-2 rounded-lg flex-grow sm:flex-grow-0 ${
            activeTab === 'toApprove' 
              ? 'bg-foundations-primary text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('toApprove')}
        >
          To approve
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'approved' ? (
        <ApprovedList /> // Display the ApprovedList component here
      ) : (
        <ToApproveList /> // Display the ToApproveList component here
      )}

      {/* Footer */}
      <div className="flex flex-wrap gap-2 text-[#3D52A0] justify-center sm:justify-start">
        <Link to="/terms" className="hover:underline">
          Terms and conditions
        </Link>
        <span className="hidden sm:inline">•</span>
        <Link to="https://rankister.com" className="hover:underline">
          Rankister.com
        </Link>
      </div>
    </div>
  );
};

export default Products;
