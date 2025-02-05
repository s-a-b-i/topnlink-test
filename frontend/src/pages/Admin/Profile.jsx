import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { profileService } from "../../utils/services"; // Removed invoiceAccountService
import ProfileSection from "../../components/publisher/ProfileSection";
import { toast } from "react-hot-toast";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?._id;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    emailLanguage: "EN",
    publisherCompanyName: "",
    avatar: null,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [isProfileSectionOpen, setIsProfileSectionOpen] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true); // Start loading
      try {
        if (userId) {
          const profileData = await profileService.getProfile(userId);
          if (profileData) {
            setProfileId(profileData._id);
            setFormData({
              firstName: profileData.firstName || "",
              lastName: profileData.lastName || "",
              phone: profileData.phone || "",
              emailLanguage: profileData.emailLanguage || "EN",
              publisherCompanyName: profileData.publisherCompanyName || "",
              avatar: profileData.avatar || null,
            });
            setAvatarPreview(profileData.avatar || null);
            setIsProfileCreated(true);
          }
        } else {
          setError("Invalid user ID");
        }
      } catch (err) {
        setError("Failed to load profile data");
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchProfileData();
  }, [userId]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Example: 10-digit phone number
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validation checks for empty fields
    const requiredFields = ['firstName', 'lastName', 'phone', 'publisherCompanyName'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    if (emptyFields.length > 0) {
      toast.error(`Please fill in the following fields: ${emptyFields.join(', ')}`);
      setLoading(false);
      return; // Stop the submission if there are empty fields
    }
    if (!validatePhoneNumber(formData.phone)) {
      toast.error("Please enter a valid phone number (10 digits).");
      setLoading(false);
      return; // Stop the submission if the phone number is invalid
    }
    try {
      const formDataToSend = new FormData();
      
      // Add userId explicitly
      formDataToSend.append('userId', userId);
      
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      if (avatarFile) {
        formDataToSend.append('avatar', avatarFile);
      }
      if (isProfileCreated) {
        await profileService.updateProfile(profileId, formDataToSend);
        toast.success("Profile updated successfully!");
        useAuthStore.getState().setUserProfileImage(avatarPreview);
      } else {
        await profileService.createProfile(formDataToSend);
        setIsProfileCreated(true);
        toast.success("Profile created successfully!");
        useAuthStore.getState().setUserProfileImage(avatarPreview);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    // Show skeleton loading instead of the Loader component
    return (
      <div className="space-y-6 px-4 md:px-8 lg:px-12 animate-pulse">
        {/* Skeleton for the title */}
        <div className="h-8 w-48 bg-gray-300 rounded"></div>
        
        {/* Skeleton for the form section */}
        <div className="space-y-4">
          <div className="h-6 w-full bg-gray-200 rounded"></div>
          <div className="h-6 w-full bg-gray-200 rounded"></div>
          <div className="h-6 w-full bg-gray-200 rounded"></div>
          <div className="h-6 w-full bg-gray-200 rounded"></div>
          <div className="h-6 w-full bg-gray-200 rounded"></div>
        </div>

        {/* Skeleton for the buttons */}
        <div className="h-10 w-24 bg-gray-300 rounded"></div>
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      <ProfileSection
        isOpen={isProfileSectionOpen}
        toggleSection={() => setIsProfileSectionOpen(!isProfileSectionOpen)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleAvatarChange={handleAvatarChange}
        avatarPreview={avatarPreview}
      />
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

export default Profile;