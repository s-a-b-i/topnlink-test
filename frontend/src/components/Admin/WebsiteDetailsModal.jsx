// import React from 'react';

// const WebsiteDetailsModal = ({ website, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
//       <div className="relative top-20 mx-auto p-6 max-w-4xl bg-white rounded-xl shadow-lg z-50">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">Website Details</h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
//               <div className="space-y-3">
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Media Name</label>
//                   <p className="text-gray-900">{website.mediaName}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Domain</label>
//                   <p className="text-gray-900">{website.webDomain}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Language</label>
//                   <p className="text-gray-900">{website.language}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Media Type</label>
//                   <p className="text-gray-900">{website.mediaType}</p>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories & Topics</h3>
//               <div className="space-y-3">
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Categories</label>
//                   <p className="text-gray-900">{website.category.join(", ")}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Sensitive Topics</label>
//                   <p className="text-gray-900">
//                     {website.sensitiveTopics?.length > 0 
//                       ? website.sensitiveTopics.join(", ") 
//                       : "None"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Details</h3>
//               <div className="space-y-3">
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Price</label>
//                   <p className="text-gray-900">${website.price}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Commission</label>
//                   <p className="text-gray-900">${website.commission}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Net Profit</label>
//                   <p className="text-gray-900">${website.netProfit}</p>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">Publication Details</h3>
//               <div className="space-y-3">
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Publication Duration</label>
//                   <p className="text-gray-900">{website.publicationDuration}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Average Publication Time</label>
//                   <p className="text-gray-900">{website.averagePublicationTime}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Google News</label>
//                   <p className="text-gray-900">{website.googleNews ? "Yes" : "No"}</p>
//                 </div>
//                 <div>
//   <label className="text-sm font-medium text-gray-500">Facebook</label>
//   <p className="text-gray-900">{website.facebook || "N/A"}</p>
// </div>
// <div>
//   <label className="text-sm font-medium text-gray-500">Reddit</label>
//   <p className="text-gray-900">{website.reddit || "N/A"}</p>
// </div>
// <div>
//   <label className="text-sm font-medium text-gray-500">Instagram</label>
//   <p className="text-gray-900">{website.instagram || "N/A"}</p>
// </div>
// <div>
//   <label className="text-sm font-medium text-gray-500">Tiktok</label>
//   <p className="text-gray-900">{website.tiktok || "N/A"}</p>
// </div>
// <div>
//   <label className="text-sm font-medium text-gray-500">Telegram</label>
//   <p className="text-gray-900">{website.telegram || "N/A"}</p>
// </div>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WebsiteDetailsModal;

import React from "react";
import { FaTimes, FaGlobe, FaLanguage, FaMoneyBillWave, FaNewspaper, FaClock, FaFacebook, FaReddit, FaInstagram, FaTiktok, FaTelegram } from "react-icons/fa";

const WebsiteDetailsModal = ({ website, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-900">Website Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <FaGlobe /> Basic Information
              </h3>
              <div className="space-y-3">
                <DetailItem label="Media Name" value={website.mediaName} />
                <DetailItem label="Domain" value={website.webDomain} />
                <DetailItem label="Language" value={website.language} icon={<FaLanguage />} />
                <DetailItem label="Media Type" value={website.mediaType} />
              </div>
            </div>
            
            {/* Categories & Topics */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <FaNewspaper /> Categories & Topics
              </h3>
              <div className="space-y-3">
                <DetailItem label="Categories" value={website.category.join(", ")} />
                <DetailItem label="Sensitive Topics" value={website.sensitiveTopics?.length > 0 ? website.sensitiveTopics.join(", ") : "None"} />
              </div>
            </div>
          </div>
          
          {/* Financial & Publication Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <FaMoneyBillWave /> Financial Details
              </h3>
              <div className="space-y-3">
                <DetailItem label="Price" value={`$${website.price}`} />
                <DetailItem label="Commission" value={`$${website.commission}`} />
                <DetailItem label="Net Profit" value={`$${website.netProfit}`} />
              </div>
            </div>

            {/* Publication Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <FaClock /> Publication Details
              </h3>
              <div className="space-y-3">
                <DetailItem label="Publication Duration" value={website.publicationDuration} />
                <DetailItem label="Avg. Publication Time" value={website.averagePublicationTime} />
                <DetailItem label="Google News" value={website.googleNews ? "Yes" : "No"} />
                <SocialDetail label="Facebook" value={website.facebook} icon={<FaFacebook className="text-blue-600" />} />
                <SocialDetail label="Reddit" value={website.reddit} icon={<FaReddit className="text-red-600" />} />
                <SocialDetail label="Instagram" value={website.instagram} icon={<FaInstagram className="text-pink-500" />} />
                <SocialDetail label="Tiktok" value={website.tiktok} icon={<FaTiktok className="text-black" />} />
                <SocialDetail label="Telegram" value={website.telegram} icon={<FaTelegram className="text-blue-400" />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, icon }) => (
  <div>
    <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
      {icon} {label}
    </label>
    <p className="text-gray-900">{value}</p>
  </div>
);

const SocialDetail = ({ label, value, icon }) => (
  <div>
    <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
      {icon} {label}
    </label>
    <p className="text-gray-900">{value || "N/A"}</p>
  </div>
);

export default WebsiteDetailsModal;