import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const navigate = useNavigate();
  const url = "https://backend.jandrnw.com/"; // ✅ Correct environment variable access

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}api/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminData(res.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.warn("Token expired, attempting refresh...");
          await handleTokenRefresh();
        } else {
          console.error("Unauthorized Access:", error);
          alert("Unauthorized Access");
        }
      }
    };

    fetchData();
  }, [token, url]);

  const handleTokenRefresh = async () => {
    try {
      const refreshRes = await axios.post(`${url}api/auth/refresh`, {
        refreshToken,
      });

      localStorage.setItem("token", refreshRes.data.accessToken);

      // Retry fetching data
      const retryRes = await axios.get(`${url}api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${refreshRes.data.accessToken}` },
      });

      setAdminData(retryRes.data);
    } catch (refreshError) {
      console.error("Refresh token failed:", refreshError);
      alert("Session expired. Please log in again.");
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8 md:mt-0 mt-10">
        {adminData ? (
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
              <h1 className="text-3xl font-semibold text-gray-800">
                Welcome, {adminData.admin.email}
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Manage your projects, services, messages, and settings.
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
