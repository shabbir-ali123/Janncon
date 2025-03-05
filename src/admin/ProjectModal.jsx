import { useState } from "react";
import axios from "axios";

const ProjectModal = ({ isOpen, onClose, project, setProjects }) => {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.images ? project.images[0] : "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = project
      ? `http://localhost:5656/api/projects/${project.id}`
      : "http://localhost:5656/api/projects";

    const method = project ? "put" : "post";

    axios[method](url, formData)
      .then((res) => {
        setProjects((prevProjects) =>
          project
            ? prevProjects.map((p) => (p.id === res.data.project.id ? res.data.project : p))
            : [...prevProjects, res.data.project]
        );
        onClose();
      })
      .catch((err) => console.error("Error saving project:", err));
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">{project ? "Edit Project" : "Add Project"}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded mb-3" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded mb-3"></textarea>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">{project ? "Update" : "Add"} Project</button>
        </form>
      </div>
    </div>
  ) : null;
};

export default ProjectModal;
