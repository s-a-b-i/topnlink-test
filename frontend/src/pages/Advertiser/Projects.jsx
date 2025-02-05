import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      
      <div className="mb-8">
        <p className="text-gray-700 mb-6">
          In this section you can create projects that contain campaigns that will allow you to better manage your personal projects or those of your clients.
        </p>
        
        <button 
        onClick={() => navigate('/advertiser/projects/create')}
        className="bg-foundations-primary  text-white font-semibold py-2 px-4 rounded"
      >
        Create project
      </button>
      </div>

      <div className="text-gray-600 mb-8">
        No projects found
      </div>

      <div className="text-sm text-orange-400">
        <Link to="/terms" className="hover:underline">Terms and conditions</Link>
        <span className="mx-2">•</span>
        <Link to="/" className="hover:underline">Rankister.com</Link>
      </div>
    </div>
  )
}

export default Projects