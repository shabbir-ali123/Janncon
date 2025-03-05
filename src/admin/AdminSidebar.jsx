import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, Briefcase, Wrench, Mail, EyeOff } from "lucide-react"; // Icons

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Projects", path: "/admin/project", icon: <Briefcase size={20} /> },
    { name: "Services", path: "/admin/services", icon: <Wrench size={20} /> },
    { name: "Messages", path: "/admin/message", icon: <Mail size={20} /> },
    { name: "Reviews Request", path: "/admin/unapproved-reviews", icon: <EyeOff size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/admin/login");
  };

  return (
    <>
      {/* Small screen button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-indigo-800 text-white p-2 rounded-md shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar for large screens */}
      <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen p-6 hidden lg:flex flex-col justify-between shadow-lg">
        <div>
          <h2 className="text-xl font-bold mb-8 text-center">Admin Dashboard</h2>
          <nav>
            <ul>
              {menuItems.map((item) => (
                <li key={item.name} className="mb-4">
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 p-3 text-lg font-medium rounded-md transition duration-300 ${
                      location.pathname === item.path
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-indigo-500 hover:text-white"
                    }`}
                  >
                    {item.icon} {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="text-lg font-medium w-full text-left hover:text-indigo-200 transition duration-300 mt-6"
        >
          Logout
        </button>
      </div>

      {/* Sidebar for small screens */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen p-6 z-40 shadow-lg">
          <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
          <nav>
            <ul>
              {menuItems.map((item) => (
                <li key={item.name} className="mb-4">
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 p-3 text-lg font-medium rounded-md transition duration-300 ${
                      location.pathname === item.path
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-indigo-500 hover:text-white"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon} {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={handleLogout}
            className="text-lg font-medium w-full text-left hover:text-indigo-200 transition duration-300 mt-6"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
