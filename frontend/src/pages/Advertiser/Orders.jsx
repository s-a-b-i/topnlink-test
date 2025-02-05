import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Orders = () => {
  const [activeTab, setActiveTab] = useState('All')
  const [orderId, setOrderId] = useState('')

  const tabs = [
    'All',
    'Pending',
    'Paid',
    'Work in progress',
    'Need Approval',
    'Completed',
    'Refunded',
    'Canceled'
  ]

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      
      <p className="text-gray-700 mb-8">
        If you have purchased the Copywriting service from Rankister the information and the article itself will be automatically sent to the publisher once you have approved it.
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md transition-colors 
              ${activeTab === tab 
                ? 'bg-foundations-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Order ID..."
          className="w-full p-2 border rounded-md"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </div>

      {/* No Orders Message */}
      <div className="text-gray-600 mb-8">
        No orders to show
      </div>

      {/* Export Button */}
      <div className="flex justify-end mb-8">
        <button className="bg-foundations-primary text-white px-4 py-2 rounded-md">
          Export in CSV
        </button>
      </div>

      {/* Footer Links */}
      <div className="text-sm text-orange-400">
        <Link to="/terms" className="hover:underline">
          Terms and conditions
        </Link>
        <span className="mx-2">•</span>
        <Link to="/" className="hover:underline">
          Rankister.com
        </Link>
      </div>
    </div>
  )
}

export default Orders