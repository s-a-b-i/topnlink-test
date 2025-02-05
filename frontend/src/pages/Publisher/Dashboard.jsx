import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const cards = [
    {
      title: "MODE",
      value: "Publisher",
      bgColor: "bg-foundations-primary",
    },
    {
      title: "ORDERS TO REVIEW",
      value: "0",
      bgColor: "bg-foundations-primary",
    },
    {
      title: "ACCOUNT BALANCE",
      value: "€ 0,00",
      bgColor: "bg-foundations-primary",
    },
    {
      title: "PENDING PAYMENTS",
      value: "0",
      bgColor: "bg-foundations-primary",
    },
  ];

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className={`${card.bgColor} h-3`} />
            <div className="p-6">
              <h3 className="text-sm text-gray-600 font-medium">{card.title}</h3>
              <p className="text-2xl font-bold mt-2">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/publisher/products/add"
          className="bg-foundations-primary text-white px-6 py-3 rounded-lg hover:bg-[#E53935] transition-colors flex-1 text-center"
        >
          Add a Website / Fanpage →
        </Link>
        <Link
          to="/publisher/products"
          className="bg-foundations-secondary text-white px-6 py-3 rounded-lg hover:bg-[#FFA000] transition-colors flex-1 text-center"
        >
          See your Websites / Fanpages →
        </Link>
      </div>

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

export default Dashboard;