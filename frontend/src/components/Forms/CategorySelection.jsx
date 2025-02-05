// components/FormSections/CategorySelection.jsx
import React from 'react';
import Select from 'react-select';

const categoryOptions = [
  { value: "Technology", label: "Technology" },
  { value: "Health", label: "Health" },
  { value: "Education", label: "Education" },
  { value: "Science", label: "Science" },
  { value: "Business", label: "Business" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Sports", label: "Sports" },
  { value: "Travel", label: "Travel" },
  { value: "Fashion", label: "Fashion" },
  { value: "Food", label: "Food" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Finance", label: "Finance" },
  { value: "Art", label: "Art" },
  { value: "Music", label: "Music" },
  { value: "Politics", label: "Politics" },
  { value: "Environment", label: "Environment" },
  { value: "Automotive", label: "Automotive" },
  { value: "Gaming", label: "Gaming" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Law", label: "Law" },
  { value: "Religion", label: "Religion" },
  { value: "Philosophy", label: "Philosophy" },
  { value: "History", label: "History" },
  { value: "Literature", label: "Literature" },
  { value: "Technology & Gadgets", label: "Technology & Gadgets" },
  { value: "Social Media", label: "Social Media" },
  { value: "Parenting", label: "Parenting" },
  { value: "Pets", label: "Pets" },
  { value: "Health & Fitness", label: "Health & Fitness" },
  { value: "Psychology", label: "Psychology" },
  { value: "Self-Help", label: "Self-Help" },
  { value: "Personal Development", label: "Personal Development" },
  { value: "Photography", label: "Photography" },
  { value: "Architecture", label: "Architecture" },
  { value: "Interior Design", label: "Interior Design" },
  { value: "Crafts & DIY", label: "Crafts & DIY" },
  { value: "E-commerce", label: "E-commerce" },
  { value: "Mobile Apps", label: "Mobile Apps" },
  { value: "Web Development", label: "Web Development" },
  { value: "Software Development", label: "Software Development" },
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
  { value: "Virtual Reality", label: "Virtual Reality" },
  { value: "Augmented Reality", label: "Augmented Reality" },
  { value: "Data Science", label: "Data Science" },
  { value: "Cryptocurrency", label: "Cryptocurrency" },
  { value: "Blockchain", label: "Blockchain" },
  { value: "Startups", label: "Startups" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
  { value: "Investment", label: "Investment" },
  { value: "Nonprofit", label: "Nonprofit" },
  { value: "Education & Learning", label: "Education & Learning" },
  { value: "Career", label: "Career" },
];

const CategorySelection = ({ formData, handleCategoryChange }) => {
  return (
    <div>
      <label className="block font-semibold">Categories <span className="text-red-500">*</span></label>
      <Select
        isMulti
        name="category"
        options={categoryOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleCategoryChange}
        value={categoryOptions.filter(option => 
          formData.category.includes(option.value)
        )}
        isClearable
        closeMenuOnSelect={false}
        maxMenuHeight={150}
        isDisabled={formData.category.length >= 20}
      />
      <p className="text-gray-500 text-sm">Select up to 20 categories.</p>
    </div>
  );
};

export default CategorySelection;