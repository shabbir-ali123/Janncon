import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5656/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminData(res.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expired, attempt to refresh
          try {
            const refreshRes = await axios.post("http://localhost:5656/api/auth/refresh", {
              refreshToken: localStorage.getItem("refreshToken"),
            });
            localStorage.setItem("token", refreshRes.data.accessToken);
            // Retry fetching data
            const retryRes = await axios.get("http://localhost:5656/api/admin/dashboard", {
              headers: { Authorization: `Bearer ${refreshRes.data.accessToken}` },
            });
            setAdminData(retryRes.data);
          } catch (refreshError) {
            console.error("Refresh token failed:", refreshError);
            alert("Session expired. Please log in again.");
            handleLogout();
          }
        } else {
          console.error("Unauthorized Access");
          alert("Unauthorized Access");
        }
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8 md:mt-0 mt-10 ">
        {adminData ? (
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg mb-6 ">
              <h1 className="text-3xl font-semibold text-gray-800">
                Welcome, {adminData.admin.email}
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Manage your projects, Services, messages and settings.
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