// CreateProject.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    name: '',
    domain: '',
    notes: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle project creation logic here
    console.log('Project Data:', projectData);
    // Navigate back to projects page after creation
    navigate('/advertiser/projects');
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Create project</h1>
      
      <Link 
        to="/advertiser/projects" 
        className="inline-flex items-center text-gray-600 mb-8 hover:text-gray-900"
      >
        <svg 
          className="w-4 h-4 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Projects
      </Link>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Project name"
            value={projectData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <input
            type="text"
            name="domain"
            placeholder="Project domain"
            value={projectData.domain}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <textarea
            name="notes"
            placeholder="Project notes"
            value={projectData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/advertiser/projects')}
            className="px-6 py-2 text-gray-700 bg-foundations-secondary rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-white bg-foundations-primary rounded-lg hover:bg-orange-500"
          >
            Create project
          </button>
        </div>
      </form>

      <div className="mt-8 text-sm">
        <Link to="/terms" className="text-orange-400 hover:underline">Terms and conditions</Link>
        <span className="mx-2 text-orange-400">•</span>
        <Link to="/" className="text-orange-400 hover:underline">Rankister.com</Link>
      </div>
    </div>
  );
};

export default CreateProject;