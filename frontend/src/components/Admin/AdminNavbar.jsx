// src/components/Admin/AdminNavbar.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  MdPerson,
  MdLogout,
  MdKeyboardArrowDown,
  MdMenu
} from "react-icons/md";
import img from "../../assets/profile.jpeg";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";


const AdminNavbar = ({onMenuClick}) => {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsProfileDropdownOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    const handleLogout = async () => {
      try {
        await logout();
        setIsProfileDropdownOpen(false);
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
  
    const handleNavigateToProfile = () => {
      navigate("/admin/profile");
      setIsProfileDropdownOpen(false);
    };
  
    const toggleProfileDropdown = () => {
      setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };
  
    return (
        <nav className="h-16 bg-white border-b relative">
      <div className="px-4 md:px-6 h-full flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={onMenuClick}
        >
          <MdMenu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Title */}
        <h1 className="text-lg md:text-xl font-bold text-gray-800 font-poppins tracking-wide bg-gradient-to-r from-foundations-primary to-blue-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
  
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={toggleProfileDropdown}
            >
              <div
                className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border-2 border-foundations-primary shadow-sm"
                style={{
                  backgroundImage: user?.profileImage
                    ? `url(${user.profileImage})`
                    : `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <MdKeyboardArrowDown
                className={`w-5 h-5 text-gray-600 transition-transform ${
                  isProfileDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
  
            {isProfileDropdownOpen && (
              <div className="absolute z-50 bg-white rounded-lg shadow-lg py-1 right-0 top-12 w-48">
                <button
                  onClick={handleNavigateToProfile}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <MdPerson className="w-5 h-5" />
                  Your Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <MdLogout className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  };
  
  export default AdminNavbar;