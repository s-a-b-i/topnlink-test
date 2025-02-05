import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { websiteService } from '../../utils/services';
import BasicInfo from './BasicInfo';
import CategorySelection from './CategorySelection';
import PriceSection from './PriceSection';
import EditorSection from './EditorSection';
import SocialMediaSection from './SocialMediaSection';
import { useAuthStore } from "../../store/authStore"; // ✅ Import auth store

const initialFormData = {
  language: "",
  mediaType: "",
  nofollow: false,
  category: [],
  webDomain: "",
  mediaName: "",
  price: "",
  commission: 0,
  netProfit: 0,
  description: "",
  publicationGuidelines: "",
  publicationDuration: "",
  averagePublicationTime: "",
  socialMedia: {
    facebook: [],
    instagram: [],
    tiktok: [],
    reddit: [],
    telegram: []
  },
  sensitiveTopics: [],
  googleNews: false,
};

const AddWebsiteForm = ({ initialData, isEditing, websiteId }) => {
  const [formData, setFormData] = useState(initialData || initialFormData);
  const [description, setDescription] = useState(initialData?.description || "");
  const [publicationGuidelines, setPublicationGuidelines] = useState(initialData?.publicationGuidelines || "");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 🔥 Get user from Auth Store
  const { user } = useAuthStore();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "price") {
      const cleanedValue = value.replace(/^0+/, '').replace(/[^\d]/g, '');
      const numValue = parseInt(cleanedValue) || 0;
      const commission = numValue * 0.1;
      const netProfit = numValue * 0.9;

      setFormData(prevData => ({
        ...prevData,
        price: cleanedValue,
        commission,
        netProfit
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    const categories = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData({ ...formData, category: categories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!user?._id) throw new Error("User ID is required");

      const finalFormData = {
        ...formData,
        description,
        publicationGuidelines,
        socialMedia: {
          facebook: formData.socialMedia.facebook,
          instagram: formData.socialMedia.instagram,
          tiktok: formData.socialMedia.tiktok,
          reddit: formData.socialMedia.reddit,
          telegram: formData.socialMedia.telegram,
        },
        userId: user._id, // ✅ Include userId
      };

      if (isEditing) {
        await websiteService.updateWebsite(websiteId, finalFormData, user._id);
        toast.success('Website updated successfully!');
      } else {
        await websiteService.createWebsite(finalFormData);
        toast.success('Website added successfully!');
      }

      navigate('/publisher/products');
    } catch (error) {
      toast.error(error.message || 'Error saving website');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Website / Fanpage' : 'Add Website / Fanpage'}
      </h1>

      <BasicInfo 
        formData={formData} 
        handleInputChange={handleInputChange} 
      />

      <CategorySelection 
        formData={formData}
        handleCategoryChange={handleCategoryChange} 
      />

      <PriceSection 
        formData={formData} 
        handleInputChange={handleInputChange} 
      />

      <EditorSection 
        description={description}
        publicationGuidelines={publicationGuidelines}
        handleDescriptionChange={setDescription}
        setPublicationGuidelines={setPublicationGuidelines}
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <SocialMediaSection 
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`${
          isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        } text-white py-2 px-6 rounded-md transition-colors`}
      >
        {isLoading ? 'Saving...' : isEditing ? 'Update Product' : 'Save Product'}
      </button>
    </form>
  );
};

export default AddWebsiteForm;
