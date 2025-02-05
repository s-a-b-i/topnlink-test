// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import EditInvoicingForm from "../../components/Forms/EditInvoicingForm";

// const Profile = () => {
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "Michael",
//     lastName: "Smyth",
//     phone: "03437771027",
//     emailLanguage: "EN",
//     publisherCompanyName: "TeqnoWebs",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission
//   };

//   return (
//     <div className="space-y-6 px-4 md:px-8 lg:px-12">
//       <h1 className="text-2xl font-bold">Profile Settings</h1>

//       <div className="bg-foundations-primary text-white p-4 rounded-lg">
//         <h2 className="font-medium">▼ Profile</h2>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-2">First name</label>
//             <input
//               type="text"
//               value={formData.firstName}
//               onChange={(e) =>
//                 setFormData({ ...formData, firstName: e.target.value })
//               }
//               className="w-full px-4 py-2 border border-gray-200 rounded-lg"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Last name</label>
//             <input
//               type="text"
//               value={formData.lastName}
//               onChange={(e) =>
//                 setFormData({ ...formData, lastName: e.target.value })
//               }
//               className="w-full px-4 py-2 border border-gray-200 rounded-lg"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Phone</label>
//             <input
//               type="text"
//               value={formData.phone}
//               onChange={(e) =>
//                 setFormData({ ...formData, phone: e.target.value })
//               }
//               className="w-full px-4 py-2 border border-gray-200 rounded-lg"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Avatar</label>
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
//               <button type="button" className="text-gray-600">
//                 Change
//               </button>
//             </div>
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Email Language</label>
//             <select
//               value={formData.emailLanguage}
//               onChange={(e) =>
//                 setFormData({ ...formData, emailLanguage: e.target.value })
//               }
//               className="w-full px-4 py-2 border border-gray-200 rounded-lg"
//             >
//               <option value="EN">EN</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">
//               Publisher company name <span className="text-blue-500">ⓘ</span>
//             </label>
//             <input
//               type="text"
//               value={formData.publisherCompanyName}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   publisherCompanyName: e.target.value,
//                 })
//               }
//               className="w-full px-4 py-2 border border-gray-200 rounded-lg"
//             />
//           </div>
//         </div>

//         <div>
//           <a href="#" className="text-gray-700 hover:underline">
//             Click here to change your email address
//           </a>
//         </div>

//         <div>
//           <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//             <span>Vsl Teviškẹs Alkas</span>
//             <span>
//               Rygos g. 26-66, Vilnius, Vilnius, 01100, vilnius, Latvia
//             </span>
//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 className="text-yellow-500"
//                 onClick={() => setShowEditForm(!showEditForm)}
//               >
//                 ✏️
//               </button>
//               <button type="button" className="text-red-500">
//                 ✖️
//               </button>
//             </div>
//           </div>
//           <button
//             type="button"
//             className="mt-4 flex items-center gap-2 text-gray-700"
//           >
//             <span>+</span> Add Invoicing Account
//           </button>
//         </div>

//         {!showEditForm && (
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
//             >
//               Save Profile
//             </button>
//           </div>
//         )}
//       </form>

//       {showEditForm && (
//         <div className="mt-4 border border-gray-200 rounded-lg p-6">
//           <EditInvoicingForm
//             onCancel={() => setShowEditForm(false)}
//             initialData={{
//               firstName: "Vsl Teviškẹs",
//               lastName: "Alkas",
//               address: "Rygos g. 26-66, Vilnius",
//               city: "Vilnius",
//               zip: "01100",
//               country: "Latvia",
//               province: "vilnius",
//             }}
//           />
//         </div>
//       )}

//       <div className="bg-foundations-primary text-white p-4 rounded-lg">
//         <h2 className="font-medium">► Publisher public profile</h2>
//       </div>

//       <div className="flex gap-2 text-[#3D52A0]">
//         <Link to="/terms" className="hover:underline">
//           Terms and conditions
//         </Link>
//         <span>•</span>
//         <Link to="https://rankister.com" className="hover:underline">
//           Rankister.com
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import {
  profileService,
  invoiceAccountService,
} from "../../utils/services";
import ProfileSection from "../../components/publisher/ProfileSection";
import InvoicingAccountsSection from "../../components/publisher/InvoicingAccountsSection";
import EditInvoicingForm from "../../components/publisher/EditInvoicingForm";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader";

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
  const [showEditForm, setShowEditForm] = useState(false);
  const [isEditingOrAdding, setIsEditingOrAdding] = useState(false);
  const [invoicingAccounts, setInvoicingAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [editingAccount, setEditingAccount] = useState(null);
  
  const [isProfileSectionOpen, setIsProfileSectionOpen] = useState(true);
  const [isInvoicingSectionOpen, setIsInvoicingSectionOpen] = useState(true);

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

          const accounts = await invoiceAccountService.getInvoiceAccounts(userId);
          setInvoicingAccounts(accounts);
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

  const handleSaveInvoicingAccount = async (accountData) => {
    setLoading(true); // Start loading
    try {
      if (editingAccount) {
        const updatedAccount = await invoiceAccountService.updateInvoiceAccount(
          editingAccount._id,
          { ...accountData, userId }
        );
        const updatedAccounts = invoicingAccounts.map((account) =>
          account._id === editingAccount._id ? updatedAccount : account
        );
        setInvoicingAccounts(updatedAccounts);
        toast.success("Invoicing account updated!");
      } else {
        const existingAccount = invoicingAccounts.find(
          (account) =>
            account.organizationName === accountData.organizationName ||
            (account.firstName === accountData.firstName &&
              account.lastName === accountData.lastName)
        );

        if (!existingAccount) {
          const newAccount = await invoiceAccountService.createInvoiceAccount({
            ...accountData,
            userId,
          });
          setInvoicingAccounts([...invoicingAccounts, newAccount]);
          toast.success("Invoicing account added!");
        } else {
          toast.error("Account already exists");
        }
      }

      setShowEditForm(false);
      setIsEditingOrAdding(false);
      setEditingAccount(null);
    } catch (error) {
      console.error("Error saving invoicing account:", error);
      toast.error("Failed to save invoicing account");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleRemoveInvoicingAccount = async (accountId) => {
    setLoading(true); // Start loading
    try {
      await invoiceAccountService.deleteInvoiceAccount(accountId);
      setInvoicingAccounts(
        invoicingAccounts.filter((account) => account._id !== accountId)
      );
      toast.success("Invoicing account removed!");
    } catch (error) {
      console.error("Error removing invoicing account:", error);
      toast.error("Failed to remove invoicing account");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleEditInvoicingAccount = (account) => {
    setEditingAccount(account);
    setShowEditForm(true);
    setIsEditingOrAdding(true);
  };

  if (loading) return <Loader />;
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

      <InvoicingAccountsSection
        isOpen={isInvoicingSectionOpen}
        toggleSection={() => setIsInvoicingSectionOpen(!isInvoicingSectionOpen)}
        invoicingAccounts={invoicingAccounts}
        handleEditInvoicingAccount={handleEditInvoicingAccount}
        handleRemoveInvoicingAccount={handleRemoveInvoicingAccount}
        setShowEditForm={setShowEditForm}
        setIsEditingOrAdding={setIsEditingOrAdding}
        setEditingAccount={setEditingAccount}
      />

      {showEditForm && (
        <div className="mt-4">
          <EditInvoicingForm
            onCancel={() => {
              setShowEditForm(false);
              setIsEditingOrAdding(false);
              setEditingAccount(null);
            }}
            onSave={handleSaveInvoicingAccount}
            initialData={editingAccount || {}}
            userId={userId}
            editMode={!!editingAccount}
            accountId={editingAccount?._id}
          />
        </div>
      )}

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