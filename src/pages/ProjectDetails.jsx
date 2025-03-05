import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GalleryApi from '../component/92ndAve/Gallery'; // Adjust the path as needed
import Testimonials from '../component/92ndAve/Testimonials'; // Ensure this is correctly imported
import brandbg from '../assets/images/brandbg.jpg'; // Adjust the path as needed

const API_BASE_URL = 'http://localhost:5656';

function ProjectDetails() {
  const { id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/projects/${id}`);
        
        // Ensure project has a valid subImages array
        const projectData = response.data.project;
        let subImagesArray = [];
        
        if (projectData.subImages) {
          if (Array.isArray(projectData.subImages)) {
            subImagesArray = projectData.subImages;
          } else if (typeof projectData.subImages === 'string') {
            try {
              const parsed = JSON.parse(projectData.subImages);
              subImagesArray = Array.isArray(parsed) ? parsed : [];
            } catch (e) {
              console.log('Failed to parse subImages as JSON:', e);
              subImagesArray = [];
            }
          }
        }
        
        setProject({
          ...projectData,
          subImages: subImagesArray
        });
        
        setError(null);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Failed to load project details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    } else {
      setError('Invalid project ID');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Project not found</p>
        </div>
      </div>
    );
  }

  // Ensure we have a valid array for the images prop
  const imageUrls = Array.isArray(project.subImages) 
    ? project.subImages.map(image => `${API_BASE_URL}/${image}`)
    : [];

  return (
    <div>
      <GalleryApi
        title={project.title}
        description={project.description}
        images={imageUrls}
        backgroundImage={brandbg}
      />
      <Testimonials
        projectId={id} 
        title="What our clients say"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt ex placeat modi magni quia error alias, adipisci rem similique."
        testimonials={[
          {
            name: "Robbert",
            position: "CTO, Robert Consultancy",
            quote: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus.",
            image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          },
          {
            name: "Mia Brown",
            position: "Marketing Manager at Stech",
            quote: "Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus.",
            image: "https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }
        ]}
      />
    </div>
  );
}

export default ProjectDetails;