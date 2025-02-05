import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Logo from "../assets/Logo.svg";
import { 
  MdDashboard, 
  MdFolder, 
  MdLocalOffer, 
  MdInventory, 
  MdPerson, 
  MdPayments, 
  MdAccountBalance, 
  MdHelp,
  MdWorkspaces, 
  MdMenuBook, 
  MdFavorite, 
  MdShoppingCart,
  MdCreditCard, 
  MdMenu, 
  MdClose 
} from "react-icons/md";

const Sidebar = ({ mode, toggleMode, userName = "Michael Smyth" }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuthStore(); // Get user from auth store

  const links = {
    Publisher: [
      { name: "Dashboard", path: "/dashboard", icon: <MdDashboard size={24} /> },
      { name: "My Products", path: "/products", icon: <MdFolder size={24} /> },
      { name: "Promos", path: "/promos", icon: <MdLocalOffer size={24} /> },
      { name: "Orders", path: "/orders", icon: <MdInventory size={24} /> },
      { name: "Profile", path: "/profile", icon: <MdPerson size={24} /> },
      { name: "Withdraw", path: "/balance/withdraw", icon: <MdPayments size={24} /> },
      { name: "Balance", path: "/balance", icon: <MdAccountBalance size={24} /> },
      { 
        name: "Faq", 
        path: "/faq", 
        icon: <MdHelp size={24} />, 
      external: true,
      },
    ],
    Advertiser: [
      { name: "Dashboard", path: "/dashboard", icon: <MdDashboard size={24} /> },
      { name: "Projects", path: "/projects", icon: <MdWorkspaces size={24} /> },
      { name: "Catalogue", path: "/catalogue", icon: <MdMenuBook size={24} /> },
      { name: "Orders", path: "/orders", icon: <MdInventory size={24} /> },
      { name: "Favorite", path: "/favorite", icon: <MdFavorite size={24} /> },
      { name: "Cart", path: "/cart", icon: <MdShoppingCart size={24} /> },
      { name: "Profile", path: "/profile", icon: <MdPerson size={24} /> },
      { name: "Deposit", path: "/deposit", icon: <MdCreditCard size={24} /> },
      { name: "Balance", path: "/balance", icon: <MdAccountBalance size={24} /> },
      { 
        name: "Faq", 
        path: "/faq", 
        icon: <MdHelp size={24} />, 
        external: true 
      },
    ],
  };

  const getFullPath = (path) => {
    if (path.startsWith('/balance')) return path;
    return `/${mode.toLowerCase()}${path}`;
  };

  const isActiveLink = (path) => {
    const fullPath = getFullPath(path);
    return location.pathname === fullPath;
  };

  const Toggler = () => (
    <div className="flex flex-col items-center bg-[#3158D3] rounded-lg p-2">
      <button
        className={`w-full py-2 px-4 rounded-md transition-all duration-200 ${
          mode === "Publisher" ? "bg-white text-[#3158D3]" : "text-white"
        }`}
        onClick={() => toggleMode("Publisher")}
      >
        Publisher
      </button>
      <button
        className={`w-full mt-2 py-2 px-4 rounded-md transition-all duration-200 ${
          mode === "Advertiser" ? "bg-white text-[#3158D3]" : "text-white"
        }`}
        onClick={() => toggleMode("Advertiser")}
      >
        Advertiser
      </button>
    </div>
  );

  const MobileMenuButton = () => (
    <button
      className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-foundations-primary text-white"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
    >
      {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
    </button>
  );

  const NavigationLinks = () => (
    <nav className="mt-6">
      <ul className="space-y-2">
        {links[mode].map((link) => {
          if (link.external) {
            return (
              <li key={link.name}>
                <a
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200
                    hover:bg-[#3158D3] hover:text-white text-gray-200`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span className="font-medium">{link.name}</span>
                </a>
              </li>
            );
          }

          return (
            <li key={link.name}>
              <Link
                to={getFullPath(link.path)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200
                  ${
                    isActiveLink(link.path)
                      ? 'bg-[#3158D3] text-white'
                      : 'hover:bg-[#3158D3] hover:text-white text-gray-200'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon}
                <span className="font-medium">{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  const SidebarContent = () => (
    <div className="min-h-full flex flex-col p-6">
      <div className="mb-6">
        <img src={Logo} alt="Logo" className="w-48 h-auto" />
      </div>

      <div className="mb-6">
        <Toggler />
      </div>

      <NavigationLinks />

     
    </div>
  );

  return (
    <>
      <MobileMenuButton />
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-foundations-primary to-foundations-secondary overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* Mobile/Tablet Sidebar with Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <aside className="fixed left-0 top-0 h-screen w-64 bg-foundations-primary overflow-y-auto">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
