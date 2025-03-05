import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = "http://localhost:5656";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    beforeImage: null,
    afterImage: null
  });
  const [errors, setErrors] = useState({
    title: '',
    description: ''
  });

  const itemsPerPage = 5;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/services`);
      setServices(res.data.services || []);
      toast.success('Services loaded successfully', { toastId: 'load-success' });
    } catch (err) {
      console.error("Error fetching services:", err);
      toast.error('Failed to load services', { toastId: 'load-error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchServiceById = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/services/${id}`);
      const service = res.data.service;
      setSelectedService(service);
      setFormData({
        title: service.title,
        description: service.description,
        beforeImage: null,
        afterImage: null
      });
      setEditMode(true);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching service:", err);
      toast.error('Failed to load service details', { toastId: 'fetch-error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ title: '', description: '' }); // Reset errors before submission
    
    // Validation
    if (!formData.title.trim()) {
      setErrors(prev => ({ ...prev, title: 'Title is required' }));
      return;
    }
    if (!formData.description.trim()) {
      setErrors(prev => ({ ...prev, description: 'Description is required' }));
      return;
    }
    
    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);

      if (formData.beforeImage) {
        formDataToSend.append('beforeImage', formData.beforeImage);
      }

      if (formData.afterImage) {
        formDataToSend.append('afterImage', formData.afterImage);
      }

      const url = editMode && selectedService 
        ? `${API_BASE_URL}/api/services/${selectedService.id}` 
        : `${API_BASE_URL}/api/services`;

      const method = editMode && selectedService ? 'put' : 'post';

      await axios({
        method: method,
        url: url,
        data: formDataToSend,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success(editMode ? 'Service updated successfully' : 'Service created successfully', { toastId: 'submit-success' });
      await fetchServices();
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error("Error saving service:", err);
      if (err.response && err.response.data && err.response.data.message) {
        const message = err.response.data.message;
        if (message.includes('Title')) {
          setErrors(prev => ({ ...prev, title: message }));
        } else if (message.includes('Description')) {
          setErrors(prev => ({ ...prev, description: message }));
        }
      } else {
        toast.error(editMode ? 'Failed to update service' : 'Failed to create service', { toastId: 'submit-error' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/api/services/${id}`);
      toast.success('Service deleted successfully', { toastId: 'delete-success' });
      await fetchServices();
    } catch (err) {
      console.error("Error deleting service:", err);
      toast.error('Failed to delete service', { toastId: 'delete-error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    fetchServiceById(service.id);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, [type]: file });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      beforeImage: null,
      afterImage: null
    });
    setEditMode(false);
    setSelectedService(null);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = services.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(services.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-indigo-700">All Services</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Add New Service
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-indigo-100">
              <th className="px-6 py-3 text-left text-indigo-900">Title</th>
              <th className="px-6 py-3 text-left text-indigo-900">Description</th>
              <th className="px-6 py-3 text-left text-indigo-900">Before Image</th>
              <th className="px-6 py-3 text-left text-indigo-900">After Image</th>
              <th className="px-6 py-3 text-center text-indigo-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{service.title}</td>
                  <td className="px-6 py-4">{service.description}</td>
                  <td className="px-6 py-4">
                    {service.beforeImage && (
                      <img
                        src={`${API_BASE_URL}/${service.beforeImage}`}
                        alt={`${service.title} before`}
                        className="w-20 h-20 object-cover rounded-lg shadow"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {service.afterImage && (
                      <img
                        src={`${API_BASE_URL}/${service.afterImage}`}
                        alt={`${service.title} after`}
                        className="w-20 h-20 object-cover rounded-lg shadow"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-blue-600 hover:text-blue-800 mx-2"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-800 mx-2"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No services found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg shadow disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg shadow disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-indigo-700">
                {editMode ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-indigo-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block mb-1 text-indigo-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="4"
                  required
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block mb-1 text-indigo-700">Before Image</label>
                {editMode && selectedService?.beforeImage && (
                  <div className="relative mb-2">
                    <img
                      src={`${API_BASE_URL}/${selectedService.beforeImage}`}
                      alt="Before"
                      className="w-20 h-20 object-cover rounded-lg shadow"
                    />
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'beforeImage')}
                  accept="image/*"
                  className="w-full"
                  required={!editMode}
                />
              </div>

              <div>
                <label className="block mb-1 text-indigo-700">After Image</label>
                {editMode && selectedService?.afterImage && (
                  <div className="relative mb-2">
                    <img
                      src={`${API_BASE_URL}/${selectedService.afterImage}`}
                      alt="After"
                      className="w-20 h-20 object-cover rounded-lg shadow"
                    />
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'afterImage')}
                  accept="image/*"
                  className="w-full"
                  required={!editMode}
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 shadow"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : (editMode ? 'Update' : 'Save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllServices;