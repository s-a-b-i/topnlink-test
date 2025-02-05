import React from 'react';

const RecentServices = ({ isLoading, recentServices, onViewProduct }) => {
  return (
    <div className="mt-6 mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        Recently Added Services
      </h3>
      {isLoading ? (
        <div className="text-center py-6 text-lg text-gray-600">Loading...</div>
      ) : recentServices.length === 0 ? (
        <div className="text-center py-6 text-lg text-gray-600">
          No recent services available.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-base text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-3 text-gray-700">Type</th>
                <th className="px-5 py-3 text-gray-700">Website Name</th>
                <th className="px-5 py-3 text-right text-gray-700">Price</th>
              </tr>
            </thead>
            <tbody>
              {recentServices.map((service, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-colors duration-150`}
                >
                  <td className="px-5 py-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      {service.icons.map((icon, i) => (
                        <span key={i} className="text-xl">{icon}</span>
                      ))}
                      <span>{service.type}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    <span 
                      className="cursor-pointer hover:underline"
                      onClick={() => onViewProduct(service.id, service.userId)}
                    >
                      {service.name}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-gray-600">
                    {service.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentServices;