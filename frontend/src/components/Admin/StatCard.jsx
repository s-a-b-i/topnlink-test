import React from 'react';
import {
  CheckCircleIcon as CheckCircleIconSolid,
  XCircleIcon as XCircleIconSolid,
  FlagIcon as FlagIconSolid,
} from "@heroicons/react/solid";

const StatCard = ({ title, value, status }) => {
  const getIcon = () => {
    switch (status) {
      case "pending":
        return "⏳";
      case "flagged":
        return <FlagIconSolid className="h-6 w-6 text-yellow-500" />;
      case "approved":
        return <CheckCircleIconSolid className="h-6 w-6 text-green-500" />;
      case "rejected":
        return <XCircleIconSolid className="h-6 w-6 text-red-500" />;
      default:
        return "📊";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{getIcon()}</span>
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {status === "pending" && value > 0 && (
          <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
            Needs Review
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;