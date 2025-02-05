import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardCards = () => {
  const navigate = useNavigate();
  
  const cards = [
    {
      title: "MODE",
      value: "Advertiser",
      bgColor: "bg-foundations-primary",
      onClick: () => {},
    },
    {
      title: "PENDING ORDERS",
      value: "0",
      bgColor: "bg-foundations-primary",
      onClick: () => navigate("/advertiser/orders"),
    },
    {
      title: "ACCOUNT BALANCE",
      value: "€ 0,00",
      bgColor: "bg-foundations-primary",
      onClick: () => navigate("/balance"),
    },
    {
      title: "CART ITEMS",
      value: "0",
      bgColor: "bg-foundations-primary",
      onClick: () => navigate("/advertiser/cart"),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
          onClick={card.onClick}
        >
          <div className={`${card.bgColor} h-3`} />
          <div className="p-6">
            <h3 className="text-sm text-gray-600">{card.title}</h3>
            <p className="text-2xl font-bold mt-2">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;