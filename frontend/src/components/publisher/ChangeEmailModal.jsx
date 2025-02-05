import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const ChangeEmailModal = ({ onClose, onSave, userId }) => {
  const { user } = useAuthStore(); // Access the current user from the store
  const currentEmail = user?.email || "";
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = async () => {
    if (!newEmail.trim()) {
      setEmailError("Email cannot be empty");
      return;
    }

    if (!validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await onSave(newEmail);
      onClose();
    } catch (error) {
      setEmailError(error.message || "Failed to change email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white w-[90%] sm:w-[28rem] p-6 rounded-lg shadow-lg animate-fade-in">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Change Email Address</h2>
        <p className="mb-4 text-gray-600">
          <span className="font-medium">Current Email:</span> {currentEmail}
        </p>

        <label className="block text-gray-700 font-medium mb-2">New Email Address</label>
        <input
          type="email"
          placeholder="Enter new email"
          value={newEmail}
          onChange={(e) => {
            setNewEmail(e.target.value);
            setEmailError("");
          }}
          className={`w-full px-4 py-3 border ${
            emailError ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200`}
        />
        {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}

        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-foundations-primary text-white rounded-lg "
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmailModal;
