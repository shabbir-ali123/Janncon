import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  
import axios from 'axios';
import banner from '../../assets/images/new-8.jpeg';

const API_BASE_URL = 'http://localhost:5656'; 

function OurProjects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fetch projects from the backend
        axios.get(`${API_BASE_URL}/api/projects`)
            .then(response => {
                setProjects(response.data.projects || []);
            })
            .catch(error => console.error("Error fetching projects:", error));
    }, []);

    return (
        <section className='bg-primary'>
            <div
                className="bg-cover bg-center h-[40vh] flex items-center font-worksans justify-center text-center text-white"
                style={{ backgroundImage: `url(${banner})` }}
            >
                <div className="z-10 px-4 w-[60%] mx-auto">
                    <h1 className="sm:text-[48px] max-sm:text-[32px]">OUR PROJECTS</h1>
                </div>
            </div>

            <div className="sm:w-[1200px] max-sm:w-[100%] mx-auto px-4 text-center py-12">
                <p className="text-white sm:text-[22px] max-sm:text-[16px] leading-relaxed mb-8">
                    We transform spaces and revive structures with expertise and care. Our projects
                    range from restoring the beauty of historical buildings to reconstructing damaged
                    properties, all while prioritizing quality craftsmanship and customer satisfaction.
                    We are committed to delivering exceptional results that reflect our passion for
                    excellence. Explore our services and see how we can bring your vision to life
                    through our projects!
                </p>
            </div>

            <div className="sm:max-w-[1200px] mx-auto grid grid-cols-2 sm:gap-4 max-sm:gap-1 px-4 pb-8">
                {projects.map((project, index) => (
                    <Link key={index} to={`/projects/${project.id}`} className="relative overflow-hidden group cursor-pointer block">
                        <img 
                            src={`${API_BASE_URL}/${project.mainImage}`} 
                            alt={project.title} 
                            className="object-cover w-full sm:h-[300px] max-sm:h-[150px] transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <h3 className="text-white text-[20px] tracking-wide capitalize text-center">
                                {project.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default OurProjects;