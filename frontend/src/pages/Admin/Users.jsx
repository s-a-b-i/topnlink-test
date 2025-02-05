import React, { useState, useEffect } from "react";
import {
  BanIcon,
  CheckCircleIcon,
  TrashIcon,
  SearchIcon,
  UserIcon,
  UserRemoveIcon,
  MailIcon,
  BadgeCheckIcon,
} from "@heroicons/react/outline";
import { userService } from "../../utils/services";
import { useAuthStore } from "../../store/authStore";
import EmailModal from "../../components/Admin/EmailModal";
import Popup from "../../components/Admin/Popup";
import { toast } from "react-hot-toast";

const User = () => {
  const { user } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedVerification, setSelectedVerification] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [loadingUserId, setLoadingUserId] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserStatus, setSelectedUserStatus] = useState(null);

  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="h-5 w-5 bg-gray-200 rounded-full mr-2"></div>
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-3 w-48 bg-gray-200 rounded mt-2"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-3">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
        </div>
      </td>
    </tr>
  );

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      let response;
      if (selectedStatus === "All" && selectedVerification === "All") {
        response = await userService.getAllUsers(user._id);
      } else if (selectedStatus !== "All" && selectedVerification === "All") {
        response = await userService.getUsersByStatus(
          user._id,
          selectedStatus === "Active"
        );
      } else if (selectedStatus === "All" && selectedVerification !== "All") {
        response = await userService.getUsersByVerification(
          user._id,
          selectedVerification === "Verified"
        );
      } else {
        const statusResponse = await userService.getUsersByStatus(
          user._id,
          selectedStatus === "Active"
        );
        response = statusResponse.filter(
          (user) => user.isVerified === (selectedVerification === "Verified")
        );
      }
      setUsers(response);
    } catch (error) {
      toast.error("Error fetching users");
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedStatus, selectedVerification, user._id]);

  const searchUsers = async () => {
    if (!searchTerm.trim()) {
      fetchUsers();
      return;
    }
    setIsLoading(true);
    try {
      const response = await userService.searchUsers(user._id, searchTerm.trim());
      setUsers(response);
    } catch (error) {
      toast.error("Error searching users");
      console.error("Error searching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleDeleteUser = async (userId) => {
    setSelectedUserId(userId);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    setLoadingUserId(selectedUserId);
    try {
      await userService.deleteUser(user._id, selectedUserId);
      setUsers(users.filter((user) => user._id !== selectedUserId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Error deleting user");
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
      setLoadingUserId(null);
      setShowDeletePopup(false);
      setSelectedUserId(null);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    setSelectedUserId(userId);
    setSelectedUserStatus(currentStatus);
    setShowStatusPopup(true);
  };

  const confirmStatusChange = async () => {
    setLoadingUserId(selectedUserId);
    setIsStatusUpdating(true);
    try {
      const newStatus = !selectedUserStatus;
      await userService.changeUserStatus(user._id, selectedUserId, newStatus);
      setUsers(users.map((user) =>
        user._id === selectedUserId ? { ...user, status: newStatus } : user
      ));
      toast.success(`User ${newStatus ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      toast.error("Error updating user status");
      console.error("Error changing user status:", error);
    } finally {
      setIsStatusUpdating(false);
      setLoadingUserId(null);
      setShowStatusPopup(false);
      setSelectedUserId(null);
      setSelectedUserStatus(null);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" ||
      (selectedStatus === "Active" ? user.status : !user.status);
    const matchesVerification =
      selectedVerification === "All" ||
      (selectedVerification === "Verified" ? user.isVerified : !user.isVerified);
    return matchesSearch && matchesStatus && matchesVerification;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSendEmail = (userEmail) => {
    setSelectedEmail(userEmail);
    setShowEmailModal(true);
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    setSelectedEmail('');
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="mb-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-gray-600">Manage users and their status.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <select
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedVerification}
            onChange={(e) => setSelectedVerification(e.target.value)}
          >
            <option value="All">All Verification</option>
            <option value="Verified">Verified</option>
            <option value="Unverified">Unverified</option>
          </select>
        </div>

        <div className="bg-white border rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name/Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="border divide-y divide-gray-200">
                {isLoading ? (
                  [...Array(5)].map((_, index) => <SkeletonRow key={index} />)
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {user.status ? (
                            <UserIcon className="h-5 w-5 text-green-500 mr-2" />
                          ) : (
                            <UserRemoveIcon className="h-5 w-5 text-red-500 mr-2" />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MailIcon className="h-4 w-4 mr-1" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                            user.isVerified
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <BadgeCheckIcon className="h-4 w-4 mr-1" />
                          {user.isVerified ? "Verified" : "Unverified"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(user.lastLogin)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex space-x-3">
                          <div className="group relative">
                            <button
                              onClick={() => handleSendEmail(user.email)}
                              className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                              disabled={isStatusUpdating || isDeleting}
                            >
                              <MailIcon className="h-5 w-5" />
                            </button>
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                              Send Message
                            </span>
                          </div>
                          <div className="group relative">
                            <button
                              onClick={() => handleToggleStatus(user._id, user.status)}
                              className={`${
                                user.status
                                  ? "text-red-600 hover:text-red-900"
                                  : "text-green-600 hover:text-green-900"
                              } disabled:opacity-50`}
                              disabled={loadingUserId === user._id || isDeleting}
                            >
                              {isStatusUpdating && loadingUserId === user._id ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                              ) : user.status ? (
                                <BanIcon className="h-5 w-5" />
                              ) : (
                                <CheckCircleIcon className="h-5 w-5" />
                              )}
                            </button>
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                              {user.status ? "Deactivate" : "Activate"}
                            </span>
                          </div>
                          <div className="group relative">
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-red-600 hover:text-red-900 disabled:opacity-50"
                              disabled={loadingUserId === user._id || isStatusUpdating}
                            >
                              {isDeleting && loadingUserId === user._id ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                              ) : (
                                <TrashIcon className="h-5 w-5" />
                              )}
                            </button>
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                              Delete
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Popup
        isOpen={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />

      <Popup
        isOpen={showStatusPopup}
        onClose={() => setShowStatusPopup(false)}
        onConfirm={confirmStatusChange}
        title={selectedUserStatus ? "Confirm Deactivation" : "Confirm Activation"}
        message={`Are you sure you want to ${selectedUserStatus ? 'deactivate' : 'activate'} this user?`}
        confirmText={selectedUserStatus ? "Deactivate" : "Activate"}
        cancelText="Cancel"
      />

      {showEmailModal && (
        <EmailModal 
          userEmail={selectedEmail} 
          onClose={handleCloseEmailModal} 
        />
      )}
    </div>
  );
};

export default User;