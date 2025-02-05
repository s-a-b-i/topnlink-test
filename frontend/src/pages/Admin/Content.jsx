// import React, { useState, useEffect } from "react";
// import { toast } from 'react-hot-toast'; // Import toast
// import StatCard from '../../components/Admin/StatCard';
// import WebsiteDetailsModal from '../../components/Admin/WebsiteDetailsModal';
// import WebsiteTable from '../../components/Admin/WebsiteTable';
// import EmailModal from '../../components/Admin/CotentEmail.jsx';
// import { useAuthStore } from "../../store/authStore";
// import { adminWebsiteService } from "../../utils/services";

// const Content = () => {
//   const { user } = useAuthStore();
//   const [pendingContent, setPendingContent] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [loadingActionId, setLoadingActionId] = useState(null);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedWebsite, setSelectedWebsite] = useState(null);
//   const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
//   const [selectedEmail, setSelectedEmail] = useState(null);

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       if (!user?._id || !user.isAdmin) {
//         setError("Unauthorized access");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const [pending, flagged, approved, rejected] = await Promise.all([
//           adminWebsiteService.getWebsitesByStatus(user._id, "pending"),
//           adminWebsiteService.getWebsitesByStatus(user._id, "flagged"),
//           adminWebsiteService.getWebsitesByStatus(user._id, "approved"),
//           adminWebsiteService.getWebsitesByStatus(user._id, "rejected")
//         ]);
        
//         const allContent = [...pending, ...flagged, ...approved, ...rejected];
//         setPendingContent(allContent);
//         setError(null);
//       } catch (error) {
//         console.error("Error fetching content:", error);
//         setError("Failed to load content");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [user]);

//   useEffect(() => {
//     const searchContent = async () => {
//       if (!user?._id || !user.isAdmin) return;

//       if (searchTerm) {
//         try {
//           const results = await adminWebsiteService.searchWebsites(user._id, searchTerm);
//           setPendingContent(results);
//           setError(null);
//         } catch (error) {
//           console.error("Error searching content:", error);
//           setError("Search failed");
//         }
//       }
//     };

//     const debounceTimeout = setTimeout(searchContent, 500);
//     return () => clearTimeout(debounceTimeout);
//   }, [searchTerm, user]);

//   const handleViewDetails = (website) => {
//     setSelectedWebsite(website);
//     setIsModalOpen(true);
//   };

//   const handleAction = async (id, newStatus) => {
//     if (!user?._id || !user.isAdmin) return;

//     setLoadingActionId(id);
//     try {
//       await adminWebsiteService.changeWebsiteStatus(user._id, id, newStatus);
//       setPendingContent((prevContent) =>
//         prevContent.map((item) =>
//           item._id === id ? { ...item, status: newStatus } : item
//         )
//       );
//       setError(null);
//       toast.success(`Status updated to ${newStatus}`); // Toast notification
//     } catch (error) {
//       console.error("Error updating status:", error);
//       setError("Failed to update status");
//       toast.error("Failed to update status"); // Toast notification
//     } finally {
//       setLoadingActionId(null);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!user?._id || !user.isAdmin) return;

//     try {
//       await adminWebsiteService.deleteWebsite(user._id, id);
//       setPendingContent((prevContent) =>
//         prevContent.filter((content) => content._id !== id)
//       );
//       setError(null);
//       toast.success("Content deleted successfully"); // Toast notification
//     } catch (error) {
//       console.error("Error deleting content:", error);
//       setError("Failed to delete content");
//       toast.error("Failed to delete content"); // Toast notification
//     }
//   };

//   const handleEmailClick = async (userId) => {
//     if (!userId) {
//       setError("No user ID found");
//       return;
//     }
  
//     try {
//       const userData = await adminWebsiteService.getUserById(user._id, userId);
//       if (!userData?.email) {
//         setError("No email address found for this user");
//         return;
//       }
//       setSelectedEmail(userData.email);
//       setIsEmailModalOpen(true);
//       toast.success("Email fetched successfully"); // Toast notification
//     } catch (error) {
//       console.error("Error fetching user email:", error);
//       setError("Failed to fetch user email");
//       toast.error("Failed to fetch user email"); // Toast notification
//     }
//   };

//   const handleStatusFilter = async (status) => {
//     if (!user?._id || !user.isAdmin) return;

//     setStatusFilter(status);
//     if (status) {
//       try {
//         const filteredContent = await adminWebsiteService.getWebsitesByStatus(user._id, status);
//         setPendingContent(filteredContent);
//         setError(null);
//         toast.success(`Filtered by status: ${status}`); // Toast notification
//       } catch (error) {
//         console.error("Error filtering content:", error);
//         setError("Failed to filter content");
//         toast.error("Failed to filter content"); // Toast notification
//       }
//     }
//   };

//   const filteredContent = pendingContent.filter(
//     (item) =>
//       item.mediaName && 
//       item.mediaName.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (statusFilter ? item.status === statusFilter : true)
//   );

//   if (!user?.isAdmin) {
//     return (
//       <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
//           <p className="mt-2 text-gray-600">You do not have permission to view this page.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Website Management
//           </h1>
//           <p className="mt-2 text-gray-600">Manage and moderate website listings</p>
//         </div>

//         {error && (
//           <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           {loading ? (
//             [1, 2, 3, 4].map((index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-sm p-6 animate-pulse"
//               >
//                 <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
//                 <div className="h-10 bg-gray-300 rounded w-1/2"></div>
//               </div>
//             ))
//           ) : (
//             <>
//               <StatCard
//                 title="Pending Review"
//                 value={pendingContent.filter((item) => item.status === "pending").length}
//                 status="pending"
//               />
//               <StatCard
//                 title="Flagged Websites"
//                 value={pendingContent.filter((item) => item.status === "flagged").length}
//                 status="flagged"
//               />
//               <StatCard
//                 title="Approved Websites"
//                 value={pendingContent.filter((item) => item.status === "approved").length}
//                 status="approved"
//               />
//               <StatCard
//                 title="Rejected Websites"
//                 value={pendingContent.filter((item) => item.status === "rejected").length}
//                 status="rejected"
//               />
//             </>
//           )}
//         </div>

//         <div className="mb-4 flex space-x-4">
//           <input
//             type="text"
//             placeholder="Search by media name"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-1/2 p-2 border rounded-lg"
//           />
//           <select
//             value={statusFilter}
//             onChange={(e) => handleStatusFilter(e.target.value)}
//             className="p-2 border rounded-lg"
//           >
//             <option value="">All Statuses</option>
//             <option value="pending">Pending</option>
//             <option value="flagged">Flagged</option>
//             <option value="approved">Approved</option>
//             <option value="rejected">Rejected</option>
//           </select>
//         </div>

//         <WebsiteTable 
//           loading={loading}
//           filteredContent={filteredContent}
//           loadingActionId={loadingActionId}
//           handleAction={handleAction}
//           handleSendEmail={handleEmailClick}
//           handleDelete={handleDelete}
//           handleViewDetails={handleViewDetails}
//         />

//         {isModalOpen && selectedWebsite && (
//           <WebsiteDetailsModal 
//             website={selectedWebsite} 
//             onClose={() => setIsModalOpen(false)} 
//           />
//         )}

//         {isEmailModalOpen && selectedEmail && (
//           <EmailModal 
//             userEmail={selectedEmail}
//             onClose={() => setIsEmailModalOpen(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Content;

import React, { useState, useEffect } from "react";
import { toast } from 'react-hot-toast'; // Import toast
import StatCard from '../../components/Admin/StatCard';
import WebsiteDetailsModal from '../../components/Admin/WebsiteDetailsModal';
import WebsiteTable from '../../components/Admin/WebsiteTable';
import EmailModal from '../../components/Admin/CotentEmail.jsx';
import { useAuthStore } from "../../store/authStore";
import { adminWebsiteService } from "../../utils/services";
import Popup from "../../components/Admin/Popup.jsx";

const Content = () => {
  const { user } = useAuthStore();
  const [pendingContent, setPendingContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loadingActionId, setLoadingActionId] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!user?._id || !user.isAdmin) {
        setError("Unauthorized access");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [pending, flagged, approved, rejected] = await Promise.all([
          adminWebsiteService.getWebsitesByStatus(user._id, "pending"),
          adminWebsiteService.getWebsitesByStatus(user._id, "flagged"),
          adminWebsiteService.getWebsitesByStatus(user._id, "approved"),
          adminWebsiteService.getWebsitesByStatus(user._id, "rejected")
        ]);
        
        const allContent = [...pending, ...flagged, ...approved, ...rejected];
        setPendingContent(allContent);
        setError(null);
      } catch (error) {
        console.error("Error fetching content:", error);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [user]);

  useEffect(() => {
    const searchContent = async () => {
      if (!user?._id || !user.isAdmin) return;

      if (searchTerm) {
        try {
          const results = await adminWebsiteService.searchWebsites(user._id, searchTerm);
          setPendingContent(results);
          setError(null);
        } catch (error) {
          console.error("Error searching content:", error);
          setError("Search failed");
        }
      }
    };

    const debounceTimeout = setTimeout(searchContent, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, user]);

  const handleViewDetails = (website) => {
    setSelectedWebsite(website);
    setIsModalOpen(true);
  };

  const handleAction = async (id, newStatus) => {
    if (!user?._id || !user.isAdmin) return;

    setLoadingActionId(id);
    try {
      await adminWebsiteService.changeWebsiteStatus(user._id, id, newStatus);
      setPendingContent((prevContent) =>
        prevContent.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
      setError(null);
      toast.success(`Status updated to ${newStatus}`); // Toast notification
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update status");
      toast.error("Failed to update status"); // Toast notification
    } finally {
      setLoadingActionId(null);
    }
  };

  const handleDelete = async (id) => {
    setDeleteTargetId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!user?._id || !user.isAdmin || !deleteTargetId) return;
  
    try {
      await adminWebsiteService.deleteWebsite(user._id, deleteTargetId);
      setPendingContent((prevContent) =>
        prevContent.filter((content) => content._id !== deleteTargetId)
      );
      setError(null);
      toast.success("Content deleted successfully");
    } catch (error) {
      console.error("Error deleting content:", error);
      setError("Failed to delete content");
      toast.error("Failed to delete content");
    } finally {
      setShowDeletePopup(false);
      setDeleteTargetId(null);
    }
  };

  const handleEmailClick = async (userId) => {
    if (!userId) {
      setError("No user ID found");
      return;
    }
  
    try {
      const userData = await adminWebsiteService.getUserById(user._id, userId);
      if (!userData?.email) {
        setError("No email address found for this user");
        return;
      }
      setSelectedEmail(userData.email);
      setIsEmailModalOpen(true);
      // toast.success("Email fetched successfully"); // Toast notification
    } catch (error) {
      console.error("Error fetching user email:", error);
      setError("Failed to fetch user email");
      toast.error("Failed to fetch user email"); // Toast notification
    }
  };

  const handleStatusFilter = async (status) => {
    if (!user?._id || !user.isAdmin) return;

    setStatusFilter(status);
    if (status) {
      try {
        const filteredContent = await adminWebsiteService.getWebsitesByStatus(user._id, status);
        setPendingContent(filteredContent);
        setError(null);
        toast.success(`Filtered by status: ${status}`); // Toast notification
      } catch (error) {
        console.error("Error filtering content:", error);
        setError("Failed to filter content");
        toast.error("Failed to filter content"); // Toast notification
      }
    }
  };

  const filteredContent = pendingContent.filter(
    (item) =>
      item.mediaName && 
      item.mediaName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? item.status === statusFilter : true)
  );

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="mt-2 text-gray-600">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Website Management
          </h1>
          <p className="mt-2 text-gray-600">Manage and moderate website listings</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {loading ? (
            [1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-10 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            <>
              <StatCard
                title="Pending Review"
                value={pendingContent.filter((item) => item.status === "pending").length}
                status="pending"
              />
              <StatCard
                title="Flagged Websites"
                value={pendingContent.filter((item) => item.status === "flagged").length}
                status="flagged"
              />
              <StatCard
                title="Approved Websites"
                value={pendingContent.filter((item) => item.status === "approved").length}
                status="approved"
              />
              <StatCard
                title="Rejected Websites"
                value={pendingContent.filter((item) => item.status === "rejected").length}
                status="rejected"
              />
            </>
          )}
        </div>

        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Search by media name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2 p-2 border rounded-lg"
          />
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="flagged">Flagged</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <WebsiteTable 
          loading={loading}
          filteredContent={filteredContent}
          loadingActionId={loadingActionId}
          handleAction={handleAction}
          handleSendEmail={handleEmailClick}
          handleDelete={handleDelete}
          handleViewDetails={handleViewDetails}
        />

        {isModalOpen && selectedWebsite && (
          <WebsiteDetailsModal 
            website={selectedWebsite} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}

<Popup
  isOpen={showDeletePopup}
  onClose={() => {
    setShowDeletePopup(false);
    setDeleteTargetId(null);
  }}
  onConfirm={confirmDelete}
  title="Confirm Delete"
  message="Are you sure you want to delete this website? This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
/>

        {isEmailModalOpen && selectedEmail && (
          <EmailModal 
            userEmail={selectedEmail}
            onClose={() => setIsEmailModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Content;