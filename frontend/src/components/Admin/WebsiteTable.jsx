import React from 'react';
import {
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  FlagIcon,
  TrashIcon,
  MailIcon,
} from "@heroicons/react/outline";

const WebsiteTable = ({ 
  loading, 
  filteredContent, 
  loadingActionId, 
  handleAction, 
  handleSendEmail, 
  handleDelete,
  handleViewDetails 
}) => {
  if (loading) {
    return (
      <div className="bg-white border rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {Array(9).fill().map((_, index) => (
                  <th key={index} className="px-6 py-3 bg-gray-50">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(3).fill().map((_, index) => (
                <tr key={index}>
                  {Array(9).fill().map((_, cellIndex) => (
                    <td key={cellIndex} className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase tracking-wider">
                View
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase tracking-wider">
                Media Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase tracking-wider">
                Domain
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium bg-gray-50 text-gray-500 uppercase tracking-wider">
                Status Actions
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium bg-gray-50 text-gray-500 uppercase tracking-wider">
                Other Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredContent.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => handleViewDetails(item)}
                    className="group relative"
                  >
                    <EyeIcon className="h-5 w-5 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-200" />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      View Details
                    </span>
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.mediaName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.webDomain}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.category.join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${item.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : item.status === "flagged"
                        ? "bg-red-100 text-red-800"
                        : item.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                {/* Status Actions Column */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center space-x-2">
                    {loadingActionId === item._id ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    ) : (
                      <>
                        <div className="group relative">
                          <CheckCircleIcon
                            onClick={() => handleAction(item._id, "approved")}
                            className="h-5 w-5 text-green-600 hover:text-green-900 cursor-pointer transition-colors duration-200"
                          />
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            Approve
                          </span>
                        </div>
                        <div className="group relative">
                          <XCircleIcon
                            onClick={() => handleAction(item._id, "rejected")}
                            className="h-5 w-5 text-red-600 hover:text-red-900 cursor-pointer transition-colors duration-200"
                          />
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            Reject
                          </span>
                        </div>
                        <div className="group relative">
                          <FlagIcon
                            onClick={() => handleAction(item._id, "flagged")}
                            className="h-5 w-5 text-yellow-600 hover:text-yellow-900 cursor-pointer transition-colors duration-200"
                          />
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            Flag
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </td>
                {/* Other Actions Column */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center space-x-2">
                    <div className="group relative">
                      <MailIcon
                        onClick={() => handleSendEmail(item.userId)}
                        className="h-5 w-5 text-blue-600 hover:text-blue-900 cursor-pointer transition-colors duration-200"
                      />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                        Send Message
                      </span>
                    </div>
                    <div className="group relative">
                      <TrashIcon
                        onClick={() => handleDelete(item._id)}
                        className="h-5 w-5 text-red-600 hover:text-gray-900 cursor-pointer transition-colors duration-200"
                      />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                        Delete
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WebsiteTable;