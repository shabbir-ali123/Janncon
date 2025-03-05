import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Fallback images in case API fails
import image1 from "../../assets/images/image0.jpeg";
import image2 from "../../assets/images/fire.jpeg";
import image3 from "../../assets/images/image2.jpeg";
import image4 from "../../assets/images/image3.jpeg";
import image5 from "../../assets/images/image4.jpeg";
import image6 from "../../assets/images/image5.jpg";

const API_BASE_URL = "http://localhost:5656";

const ConstructionServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback data
  const fallbackServices = [
    {
      title: "Mitigation and restoration",
      description: "We identify and repair construction defects to ensure the durability and safety of your building.",
      image: image4,
    },
    {
      title: "fire damage restoration",
      description: "Repairing or rebuilding damaged structures, replacing drywall, flooring, and repainting to restore the property to its pre-fire condition.",
      image: image2,
    },
    {
      title: "Drywall/painting",
      description: "Enhance your property's exterior with professional siding and trim repair services.",
      image: image5,
    },
    {
      title: "Interior/exterior finishing",
      description: "We construct and waterproof decks to ensure long-lasting durability and style.",
      image: image1,
    },
    {
      title: "Emergency services",
      description: "Professional installation of energy-efficient doors and windows for your property.",
      image: image6,
    },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/services`);
        
        if (response.data && response.data.services && response.data.services.length > 0) {
          setServices(response.data.services);
        } else {
          // Use fallback data if API returns empty array
          setServices(fallbackServices);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Using default services instead.");
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="pt-10 pb-16 font-worksans bg-primary text-white">
      {/* Heading Section */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-semibold">Our Services</h1>
        <div className="w-12 h-[2px] bg-white my-2"></div>
        <p className="text-white text-lg max-w-lg px-4">
          Our Reconstruction Crews specialize in providing top-tier construction services with expertise and precision.
        </p>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto mt-10 px-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id || index}
                className="bg-white shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl "
              >
                {/* Before/After Image Section */}
                <div className="flex flex-col">
                  {/* Before Image */}
                  <div className="relative ">
                    <img
                      src={service.beforeImage ? `${API_BASE_URL}/${service.beforeImage}` : fallbackServices[index % fallbackServices.length].image}
                      alt={`${service.title} before`}
                      className="w-full h-[350px] object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackServices[index % fallbackServices.length].image;
                      }}
                    />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white text-xs px-4 py-1">
                      BEFORE
                    </div>
                  </div>
                  
                  {/* After Image */}
                  <div className="relative">
                    <img
                      src={service.afterImage ? `${API_BASE_URL}/${service.afterImage}` : fallbackServices[(index + 2) % fallbackServices.length].image}
                      alt={`${service.title} after`}
                      className="w-full h-[350px] object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackServices[(index + 2) % fallbackServices.length].image;
                      }}
                    />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white text-xs px-4 py-1">
                      AFTER
                    </div>
                  </div>
                </div>
                
                {/* Service Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#292B37] capitalize">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{service.description}</p>
                  <Link to="/contact"> 
                    <button className="my-2 bg-primary text-white text-center text-[18px] font-medium max-sm:w-full md:px-[40px] py-2 rounded">
                      Contact Us
                    </button> 
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {error && (
          <div className="text-center mt-4 text-yellow-300">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConstructionServices;