import React, { useState, useEffect } from 'react';
import { faqService } from '../../utils/services';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';
import Popup from '../../components/Admin/Popup';

const SkeletonFaqCard = () => (
  <div className="animate-pulse bg-white border border-gray-100 rounded-xl shadow-sm">
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
    </div>
    <div className="p-6">
      <div className="h-20 bg-gray-200 rounded"></div>
    </div>
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
      <div className="flex space-x-4">
        <div className="h-8 w-16 bg-gray-200 rounded"></div>
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
        <div className="h-8 w-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

const EditFaqForm = ({ editingFaq, setEditingFaq, categories, onUpdate, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onUpdate(e);
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Edit FAQ</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <select
            value={editingFaq.categoryId}
            onChange={(e) => setEditingFaq({...editingFaq, categoryId: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          value={editingFaq.question}
          onChange={(e) => setEditingFaq({...editingFaq, question: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Question"
          disabled={isSubmitting}
        />
        <textarea
          value={editingFaq.answer}
          onChange={(e) => setEditingFaq({...editingFaq, answer: e.target.value})}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Answer"
          disabled={isSubmitting}
        />
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Updating...
              </div>
            ) : (
              'Update FAQ'
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const FaqCard = ({ faq, categories, onEdit, onDelete, onStatusChange }) => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleStatusChange = async () => {
    setIsStatusLoading(true);
    await onStatusChange(faq._id, faq.active);
    setIsStatusLoading(false);
  };

  // const handleDelete = async () => {
  //   setIsDeleteLoading(true);
  //   await onDelete(faq._id);
  //   setIsDeleteLoading(false);
  // };

  const handleDelete = () => {
    setIsDeleteLoading(true);
    onDelete(faq._id);
    setIsDeleteLoading(false);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
              {categories.find(c => c._id === faq.category)?.name}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${faq.active ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
              <span className={`w-2 h-2 mr-2 rounded-full ${faq.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {faq.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-2">
          {faq.question}
        </h3>
      </div>

      <div className="p-6">
        <div className="prose prose-sm max-w-none text-gray-600">
          {faq.answer}
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onEdit(faq)}
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 disabled:opacity-50"
              disabled={isStatusLoading || isDeleteLoading}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              onClick={handleStatusChange}
              className={`inline-flex items-center text-sm font-medium ${faq.active ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'} transition-colors duration-200 disabled:opacity-50`}
              disabled={isDeleteLoading}
            >
              {isStatusLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  {faq.active ? 'Deactivate' : 'Activate'}
                </>
              )}
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200 disabled:opacity-50"
              disabled={isDeleteLoading || isStatusLoading}
            >
              {isDeleteLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  const { user } = useAuthStore();
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState(null);
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Add these with other state declarations
const [showDeleteFaqPopup, setShowDeleteFaqPopup] = useState(false);
const [showDeleteCategoryPopup, setShowDeleteCategoryPopup] = useState(false);
const [deleteTargetId, setDeleteTargetId] = useState(null);

  const [newFaq, setNewFaq] = useState({
    question: '',
    answer: '',
    categoryId: '',
    userId: user._id
  });

  const [newCategory, setNewCategory] = useState({
    name: '',
    userId: user._id
  });

  useEffect(() => {
    fetchInitialData();
  }, [user._id]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const categoriesData = await faqService.getAllCategories(user._id);
      setCategories(categoriesData);
      
      if (categoriesData.length > 0) {
        const firstCategoryId = categoriesData[0]._id;
        setSelectedCategory(firstCategoryId);
        const faqsData = await faqService.getFAQsByCategory(user._id, firstCategoryId);
        setFaqs(faqsData);
      }
    } catch (error) {
      toast.error('Failed to fetch initial data');
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }
    setIsSubmitting(true);
    try {
      await faqService.addCategory(user._id, newCategory.name);
      setNewCategory({ name: '', userId: user._id });
      const updatedCategories = await faqService.getAllCategories(user._id);
      setCategories(updatedCategories);
      toast.success('Category added successfully');
    } catch (error) {
      toast.error('Failed to add category');
      console.error('Error adding category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    setDeleteTargetId(categoryId);
    setShowDeleteCategoryPopup(true);
  };

  const confirmDeleteCategory = async () => {
    setIsSubmitting(true);
    try {
      await faqService.deleteCategory(user._id, deleteTargetId);
      const updatedCategories = await faqService.getAllCategories(user._id);
      setCategories(updatedCategories);
      
      if (deleteTargetId === selectedCategory && updatedCategories.length > 0) {
        const newSelectedCategory = updatedCategories[0]._id;
        setSelectedCategory(newSelectedCategory);
        const faqsData = await faqService.getFAQsByCategory(user._id, newSelectedCategory);
        setFaqs(faqsData);
      } else if (updatedCategories.length === 0) {
        setFaqs([]);
        setSelectedCategory('');
      }
      toast.success('Category deleted successfully');
    } catch (error) {
      toast.error('Failed to delete category');
      console.error('Error deleting category:', error);
    } finally {
      setIsSubmitting(false);
      setShowDeleteCategoryPopup(false);
      setDeleteTargetId(null);
    }
  };

  const handleAddFaq = async (e) => {
    e.preventDefault();
    if (!newFaq.question.trim() || !newFaq.answer.trim() || !newFaq.categoryId) {
      toast.error('All fields are required');
      return;
    }
    setIsSubmitting(true);
    try {
      const faqData = {
        question: newFaq.question,
        answer: newFaq.answer,
        category: newFaq.categoryId,
        userId: user._id
      };

      await faqService.createFAQ(user._id, faqData);
      setNewFaq({ question: '', answer: '', categoryId: '', userId: user._id });
      setShowFaqForm(false);
      
      const updatedFaqs = await faqService.getFAQsByCategory(user._id, newFaq.categoryId);
      setFaqs(updatedFaqs);
      toast.success('FAQ added successfully');
    } catch (error) {
      toast.error('Failed to add FAQ');
      console.error('Error adding FAQ:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateFaq = async (e) => {
    e.preventDefault();
    if (!editingFaq.question.trim() || !editingFaq.answer.trim() || !editingFaq.categoryId) {
      toast.error('All fields are required');
      return;
    }
    setIsSubmitting(true);
    try {
      const updatedData = {
        question: editingFaq.question,
        answer: editingFaq.answer,
        category: editingFaq.categoryId,
        active: editingFaq.active
      };
  
      await faqService.updateFAQ(user._id, editingFaq._id, updatedData);
      const updatedFaqs = await faqService.getFAQsByCategory(user._id, selectedCategory);
      setFaqs(updatedFaqs);
      setEditingFaq(null);
      toast.success('FAQ updated successfully');
    } catch (error) {
      toast.error('Failed to update FAQ');
      console.error('Error updating FAQ:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFaq = async (faqId) => {
    setDeleteTargetId(faqId);
    setShowDeleteFaqPopup(true);
  };

  const confirmDeleteFaq = async () => {
    const loadingToast = toast.loading('Deleting FAQ...');
    try {
      await faqService.deleteFAQ(user._id, deleteTargetId);
      setFaqs(faqs.filter(faq => faq._id !== deleteTargetId));
      toast.success('FAQ deleted successfully', { id: loadingToast });
    } catch (error) {
      toast.error('Failed to delete FAQ', { id: loadingToast });
      console.error('Error deleting FAQ:', error);
    } finally {
      setShowDeleteFaqPopup(false);
      setDeleteTargetId(null);
    }
  };

  const handleStatusChange = async (faqId, currentStatus) => {
    const loadingToast = toast.loading('Updating status...');
    try {
      await faqService.changeFAQStatus(user._id, faqId, !currentStatus);
      setFaqs(faqs.map(faq => 
        faq._id === faqId ? { ...faq, active: !currentStatus } : faq
      ));
      toast.success('Status updated successfully', { id: loadingToast });
    } catch (error) {
      toast.error('Failed to change FAQ status', { id: loadingToast });
      console.error('Error changing FAQ status:', error);
    }
  };

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    try {
      const faqsData = await faqService.getFAQsByCategory(user._id, categoryId);
      setFaqs(faqsData);
    } catch (error) {
      toast.error('Failed to fetch FAQs for category');
      console.error('Error fetching FAQs for category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      if (selectedCategory) {
        handleCategoryChange(selectedCategory);
      }
      return;
    }
    setLoading(true);
    try {
      const searchResults = await faqService.searchFAQsAdmin(user._id, searchTerm);
      setFaqs(searchResults);
    } catch (error) {
      toast.error('Failed to search FAQs');
      console.error('Error searching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Main Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
        <p className="mt-2 text-gray-600">Manage your frequently asked questions</p>
      </div>

      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar - Category Management */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            
            {/* Add Category Form */}
            <form onSubmit={handleAddCategory} className="mb-6">
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="New category name"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Adding...
                    </div>
                  ) : (
                    'Add Category'
                  )}
                </button>
              </div>
            </form>

            {/* Category List */}
            <div className="space-y-2">
              {loading ? (
                [...Array(3)].map((_, index) => (
                  <div key={index} className="animate-pulse h-12 bg-gray-200 rounded-lg"></div>
                ))
              ) : categories.map((category) => (
                <div
                  key={category._id}
                  className={`group flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer
                    ${selectedCategory === category._id 
                      ? 'bg-blue-50 border-blue-200 border' 
                      : 'hover:bg-gray-50 border border-transparent'}`}
                  onClick={() => handleCategoryChange(category._id)}
                >
                  <span className="font-medium text-gray-700">{category.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category._id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity duration-200 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Search Bar with Add FAQ Button */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="relative flex-1 mr-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search FAQs..."
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                onClick={() => setShowFaqForm(!showFaqForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                {showFaqForm ? 'Cancel' : 'Add FAQ'}
              </button>
            </div>
          </div>

          {/* Add New FAQ Form */}
          {showFaqForm && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New FAQ</h2>
              <form onSubmit={handleAddFaq} className="space-y-4">
                <div>
                  <select
                    value={newFaq.categoryId}
                    onChange={(e) => setNewFaq({...newFaq, categoryId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Question"
                  disabled={isSubmitting}
                />
                <textarea
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Answer"
                  disabled={isSubmitting}
                />
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Adding FAQ...
                      </div>
                    ) : (
                      'Add FAQ'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFaqForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* FAQ List */}
          <div className="space-y-6">
            {loading ? (
              [...Array(3)].map((_, index) => <SkeletonFaqCard key={index} />)
            ) : (
              <>
                {editingFaq && (
                  <EditFaqForm
                    editingFaq={editingFaq}
                    setEditingFaq={setEditingFaq}
                    categories={categories}
                    onUpdate={handleUpdateFaq}
                    onCancel={() => setEditingFaq(null)}
                  />
                )}
                
                {faqs.map((faq) => (
                  !editingFaq || editingFaq._id !== faq._id ? (
                    <FaqCard
                      key={faq._id}
                      faq={faq}
                      categories={categories}
                      onEdit={setEditingFaq}
                      onDelete={handleDeleteFaq}
                      onStatusChange={handleStatusChange}
                    />
                  ) : null
                ))}
                
                {faqs.length === 0 && !loading && (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs Found</h3>
                    <p className="text-gray-500">
                      {selectedCategory 
                        ? 'Get started by adding some FAQs to this category.' 
                        : 'Please select a category to view its FAQs.'}
                    </p>
                  </div>
                  
                )}
                {/* Add just before the final closing div */}

              </>
            )}
          </div>
          <Popup
  isOpen={showDeleteCategoryPopup}
  onClose={() => {
    setShowDeleteCategoryPopup(false);
    setDeleteTargetId(null);
  }}
  onConfirm={confirmDeleteCategory}
  title="Confirm Category Delete"
  message="Are you sure you want to delete this category? All associated FAQs will be permanently deleted."
  confirmText="Delete"
  cancelText="Cancel"
/>

<Popup
  isOpen={showDeleteFaqPopup}
  onClose={() => {
    setShowDeleteFaqPopup(false);
    setDeleteTargetId(null);
  }}
  onConfirm={confirmDeleteFaq}
  title="Confirm FAQ Delete"
  message="Are you sure you want to delete this FAQ? This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
/>
        </div>
      </div>
    </div>
  );
};

export default Faq;