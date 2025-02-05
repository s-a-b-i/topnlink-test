import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminNavbar from "../components/Admin/AdminNavbar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full lg:ml-64">
        {/* Navbar */}
        <div className="sticky top-0 z-10 bg-white border-b w-full">
          <AdminNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-2 md:p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
