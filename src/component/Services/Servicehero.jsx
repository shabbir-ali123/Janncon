import React from 'react';
import servicesbg from '../../assets/images/new-5.jpeg';

function Servicehero() {
    return (
        <section className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-center text-white font-worksans"
            style={{ backgroundImage: `url(${servicesbg})` }}>
            
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 px-4 w-[100%] mx-auto animate-fadeIn">
                <h1 className="text-[68px] font-bold">SERVICES</h1>
                <div className="w-[20%] bg-gray-600 h-[2px] mx-auto"></div>
                <p className="mt-4 text-[20px]">
                Delivering top-tier restoration and construction services with precision, 
                integrity, and a commitment to excellence. Your vision, our expertise.
                </p>
            </div>
        </section>
    );
}

export default Servicehero;
