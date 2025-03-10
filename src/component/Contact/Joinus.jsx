import React from "react";
import { TiTick } from "react-icons/ti";
import bsdk from "/src/assets/images/new-10.jpeg";
import { Link } from "react-router-dom";

const jobPositions = [
  "Skilled Carpenters",
  "Experienced Applicator",
  "Restoration Carpenter",
  "Restoration Business Developer",
  "Restoration & Mitigation Technician",
];

function Joinus() {
  return (
    <section
      className="relative font-worksans bg-black bg-no-repeat bg-cover py-16 px-6 text-center"
      style={{ backgroundImage: `url(${bsdk})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Content */}
      <div className="relative z-10 lg:w-[40%] mx-auto text-white">
        <h2 className="sm:text-[44px] text-gray-100 uppercase">
          J&R NW Construction
        </h2>
        <div className="w-[130px] h-[2px] bg-gray-400 mx-auto my-4"></div>
        <p className="text-gray-300 sm:text-[17px] leading-relaxed">
          Join Our Team! We're always looking for talented individuals to grow
          with us. If you're interested in any of the positions listed below,
          please complete the application and submit it in person or via email
          <a href="#" className="text-[#c7c7ff] font-bold mx-1">
            jandrnwconstruction@gmail.com
          </a>
        </p>

        {/* Job Listings */}
        <ul className="mt-6 space-y-3 text-left text-gray-300">
          {jobPositions.map((job, index) => (
            <li key={index} className="flex items-center space-x-2">
              <TiTick className="h-6 w-8 text-[#c7c7ff]" />
              <span className="text-[14px]">{job}</span>
            </li>
          ))}
        </ul>

        {/* Apply Button */}
        <button className="mt-6 bg-primary p-[10px] text-white text-[14px] w-full transition duration-300">
          <Link to="/contact">Contact Us</Link>
        </button>
      </div>
    </section>
  );
}

export default Joinus;
