import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'env.process.BASE_URL';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mainImage: null,
    subImages: []
  });
  const [errors, setErrors] = useState({
    title: '',
    description: ''
  });

  const itemsPerPage = 5;

  useEffect(() => {
    fetchProjects();
  }, []);

  // Helper function to ensure subImages is an array
  const ensureSubImagesArray = (project) => {
    if (!project) return project;
    
    let subImagesArray = [];
    
    if (!project.subImages) {
      subImagesArray = [];
    } else if (Array.isArray(project.subImages)) {
      subImagesArray = project.subImages;
    } else if (typeof project.subImages === 'string') {
      try {
        const parsed = JSON.parse(project.subImages);
        subImagesArray = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        // If it can't be parsed as JSON, it's not a valid array
        subImagesArray = [];
      }
    }
    
    return {
      ...project,
      subImages: subImagesArray
    };
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/projects`);
      
      // Process each project to ensure subImages is an array
      const processedProjects = (res.data.projects || []).map(ensureSubImagesArray);
      
      setProjects(processedProjects);
      toast.success('Projects loaded successfully', { toastId: 'load-success' });
    } catch (err) {
      console.error("Error fetching projects:", err);
      toast.error('Failed to load projects', { toastId: 'load-error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectById = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/projects/${id}`);
      const project = res.data.project;
      
      // Process the project to ensure subImages is an array
      const processedProject = ensureSubImagesArray(project);
      
      setSelectedProject(processedProject);
      setFormData({
        title: project.title,
        description: project.description,
        mainImage: null,
        subImages: []
      });
      setEditMode(true);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching project:", err);
      toast.error('Failed to load project details', { toastId: 'fetch-error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ title: '', description: '' }); // Reset errors before submission
    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);

      if (formData.mainImage) {
        formDataToSend.append('mainImage', formData.mainImage);
      }

      if (formData.subImages.length > 0) {
        formData.subImages.forEach(image => {
          formDataToSend.append('subImages', image);
        });
      }

      const url = editMode && selectedProject 
        ? `${API_BASE_URL}/api/projects/${selectedProject.id}` 
        : `${API_BASE_URL}/api/projects/create`;

      const method = editMode && selectedProject ? 'put' : 'post';

      await axios({
        method: method,
        url: url,
        data: formDataToSend,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success(editMode ? 'Project updated successfully' : 'Project created successfully', { toastId: 'submit-success' });
      await fetchProjects();
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error("Error saving project:", err);
      if (err.response && err.response.data && err.response.data.message) {
        const message = err.response.data.message;
        if (message.includes('Title')) {
          setErrors(prev => ({ ...prev, title: message }));
        } else if (message.includes('Description')) {
          setErrors(prev => ({ ...prev, description: message }));
        }
      } else {
        toast.error(editMode ? 'Failed to update project' : 'Failed to create project', { toastId: 'submit-error' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/api/projects/${id}`);
      toast.success('Project deleted successfully', { toastId: 'delete-success' });
      await fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error('Failed to delete project', { toastId: 'delete-error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    fetchProjectById(project.id);
  };

  const handleFileChange = (e, type) => {
    const files = e.target.files;
    if (!files.length) return;

    if (type === 'mainImage') {
      setFormData({ ...formData, mainImage: files[0] });
    } else {
      setFormData({ ...formData, subImages: Array.from(files) });
    }
  };

  const handleDeleteMainImage = async () => {
    if (!window.confirm("Are you sure you want to delete the main image?")) return;

    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/api/projects/${selectedProject.id}/mainImage`);
      toast.success('Main image deleted successfully', { toastId: 'main-delete-success' });
      setSelectedProject(prev => ({ ...prev, mainImage: null }));
    } catch (err) {
      console.error("Error deleting main image:", err);
      toast.error('Failed to delete main image', { toastId: 'main-delete-error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubImage = async (image) => {
    if (!window.confirm("Are you sure you want to delete this sub image?")) return;

    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/api/projects/${selectedProject.id}/subImage`, {
        data: { imageUrl: image }
      });
      toast.success('Sub image deleted successfully', { toastId: 'sub-delete-success' });
      setSelectedProject(prev => {
        const updatedProject = ensureSubImagesArray(prev);
        return {
          ...updatedProject,
          subImages: updatedProject.subImages.filter(img => img !== image)
        };
      });
    } catch (err) {
      console.error("Error deleting sub image:", err);
      toast.error('Failed to delete sub image', { toastId: 'sub-delete-error' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      mainImage: null,
      subImages: []
    });
    setEditMode(false);
    setSelectedProject(null);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-indigo-700">All Projects</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Add New Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-indigo-100">
              <th className="px-6 py-3 text-left text-indigo-900">Title</th>
              <th className="px-6 py-3 text-left text-indigo-900">Description</th>
              <th className="px-6 py-3 text-left text-indigo-900">Main Image</th>
              <th className="px-6 py-3 text-left text-indigo-900">Sub Images</th>
              <th className="px-6 py-3 text-center text-indigo-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{project.title}</td>
                <td className="px-6 py-4">{project.description}</td>
                <td className="px-6 py-4">
                  {project.mainImage && (
                    <img
                      src={`${API_BASE_URL}/${project.mainImage}`}
                      alt={project.title}
                      className="w-20 h-20 object-cover rounded-lg shadow"
                    />
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {Array.isArray(project.subImages) && project.subImages.map((image, index) => (
                      <img
                        key={index}
                        src={`${API_BASE_URL}/${image}`}
                        alt={`${project.title} ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-lg shadow"
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-blue-600 hover:text-blue-800 mx-2"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:text-red-800 mx-2"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
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
                {editMode ? 'Edit Project' : 'Add New Project'}
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
                <label className="block mb-1 text-indigo-700">Main Image</label>
                {editMode && selectedProject?.mainImage && (
                  <div className="relative mb-2">
                    <img
                      src={`${API_BASE_URL}/${selectedProject.mainImage}`}
                      alt="Current main"
                      className="w-20 h-20 object-cover rounded-lg shadow"
                    />
                    <button
                      type="button"
                      onClick={handleDeleteMainImage}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'mainImage')}
                  accept="image/*"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-1 text-indigo-700">Sub Images</label>
                {editMode && selectedProject?.subImages && Array.isArray(selectedProject.subImages) && selectedProject.subImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedProject.subImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={`${API_BASE_URL}/${image}`}
                          alt={`Sub ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-lg shadow"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteSubImage(image)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">
                    {editMode ? 
                      "Uploading new sub images will replace all existing ones" : 
                      "You can select multiple images"}
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange(e, 'subImages')}
                    accept="image/*"
                    className="w-full"
                  />
                </div>
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

export default AllProjects;