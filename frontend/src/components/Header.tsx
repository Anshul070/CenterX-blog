import { Avatar } from "./BlogDisplayCard";
import { useNavigate } from "react-router";
import { logout } from "../utils/handlers";
import { useState } from "react";
import Menubar from "./Menubar";
import { useUserInfo } from "../hooks";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {loading, error ,user} = useUserInfo();
  const menuItems = [
    {
      title: "Profile",
      action: () => navigate("/profile/"),
      style: "text-gray-700",
    },
    {
      title: "Logout",
      action: () => {
        logout();
        navigate("/");
      },
      style: "text-red-600",
    },
  ];

  if(error){
    logout();
    navigate("/")
  }

  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <h1 
            className="text-xl font-bold cursor-pointer select-none"
            onClick={() => navigate("/blogs/")}
          >
            CenterX
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate("/blogs/new/")}
              className="text-sm font-medium text-green-500 border border-green-500 px-3 py-1 rounded-full hover:text-white hover:bg-green-500 transition-colors"
            >
              Create Blog
            </button>
            <div className="relative group">
              <Avatar name={loading ? "" : user.name} size={6}  />
              <Menubar menu={menuItems} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              {/* Hamburger Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  navigate("/blogs/new/");
                  setIsMenuOpen(false);
                }}
                className="text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                Create Blog
              </button>
              <hr className="text-gray-300"/>
              <button
                onClick={() => {
                  navigate("/profile/");
                  setIsMenuOpen(false);
                }}
                className="text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                Profile
              </button>
                <hr className="text-gray-300"/>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                  setIsMenuOpen(false);
                }}
                className="text-left px-2 py-2 text-sm text-red-600 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;