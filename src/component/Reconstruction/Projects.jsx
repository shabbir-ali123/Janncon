import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5656';

function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchLatestProjects = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/projects/latest`);
                setProjects(response.data.projects || []);
            } catch (error) {
                console.error('Error fetching latest projects:', error);
            }
        };

        fetchLatestProjects();
    }, []);

    return (
        <div className="pt-[40px] bg-primary text-center py-8 font-worksans">
            <div className='max-w-6xl mx-auto'>
                <div className='mb-16'>
                    <h2 className="text-[36px] md:text-[46px] mb-4 text-white">Recent Projects</h2>
                    <div className="w-[30%] md:w-[15%] mx-auto border-b-2 border-white mb-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-6">
                    {projects.map((project) => (
                        <Link 
                            key={project.id} 
                            to={`/projects/${project.id}`} 
                            className="w-full h-[300px] bg-cover bg-center relative group"
                            style={{ backgroundImage: `url(${API_BASE_URL}/${project.mainImage})` }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <h3 className="text-white text-[20px] tracking-wide capitalize text-center">{project.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Projects;