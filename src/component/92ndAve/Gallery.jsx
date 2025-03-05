import React from 'react';
import { Link } from 'react-router-dom';

function Gallery({ title, description, images, backgroundImage }) {
    return (
        <div>
            {/* Background Section */}
            <div 
                className="bg-cover bg-center h-[30vh] flex items-center font-worksans justify-center text-center text-white"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="z-10 px-4 w-[60%] mx-auto">
                    <h1 className="md:text-[48px] sm-max:text-[38px] tx">{title}</h1>
                </div>
            </div>

            {/* Gallery Section */}
            <div className=" md:max-w-[1200px] mx-auto px-4 max-sm:w-[100%]">
                <h2 className="text-[26px] my-5 text-black">{description}</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 my-10">
                    {images.map((image, index) => (
                        <div key={index} className="overflow-hidden flex justify-center">
                            <img 
                                src={image} 
                                alt={`Gallery Image ${index + 1}`} 
                                className="object-cover w-[600px] h-[300px]"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-center '>
                <Link className='bg-primary text-white py-2 rounded-md hover:bg-yellow-600 py-3 px-4' to="/contact">Contact Us</Link>
            </div>
        </div>
    );
}

export default Gallery;
