import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdClose, MdDashboard, MdPeople, MdContentPaste, MdPayments, MdMessage, MdAnalytics, MdSettings   } from "react-icons/md";
import Logo from "../../assets/Logo.svg";

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard size={24} /> },
    { name: "User Management", path: "/admin/users", icon: <MdPeople size={24} /> },
    { name: "Content Moderation", path: "/admin/content", icon: <MdContentPaste size={24} /> },
    { name: "Transactions", path: "/admin/transactions", icon: <MdPayments size={24} /> },
    { name: "Faq", path: "/admin/faq", icon: <MdMessage size={24} /> },
    { name: "Reports", path: "/admin/reports", icon: <MdAnalytics size={24} /> },
    { name: "Settings", path: "/admin/settings", icon: <MdSettings size={24} /> },
    {name:"Profile", path:"/admin/profile", icon:<MdPeople size={24}/>},
  ];

  const isActiveLink = (path) => location.pathname === path;

  return (
    <aside
      className={`fixed left-0 top-0 w-64 h-screen z-[9999] bg-gradient-to-b from-foundations-primary to-foundations-secondary overflow-y-auto transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="min-h-full flex flex-col p-6 relative">
        {/* Close Button for Mobile */}
        <button
          className="absolute top-4 right-4 lg:hidden text-white"
          onClick={onClose}
        >
          <MdClose size={24} />
        </button>

        {/* Logo */}
        <div className="mb-6">
          <img src={Logo} alt="Logo" className="w-48 h-auto" />
        </div>

        {/* Navigation Links */}
        <nav className="mt-6">
          <ul className="space-y-2">
            {adminLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200
                    ${
                      isActiveLink(link.path)
                        ? "bg-[#3158D3] text-white"
                        : "hover:bg-[#3158D3] hover:text-white text-gray-200"
                    }`}
                  onClick={onClose} // Close sidebar when a link is clicked (for mobile)
                >
                  {link.icon}
                  <span className="font-medium">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
