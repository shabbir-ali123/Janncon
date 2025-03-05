import React from "react";
import { TiTick } from "react-icons/ti";
import bgjoinus from "../../assets/images/joinus.jpg";
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
      className="font-worksans bg-black bg-opacity-50 py-16 px-6 text-center"
      style={{ backgroundImage: `url(${bgjoinus})` }}
    >
      <div className="lg:w-[40%] mx-auto">
        <h2 className="sm:text-[44px] text-gray-900 uppercase">
          J&R NW Construction
        </h2>
        <div className="w-[130px] h-[2px] bg-gray-500 mx-auto my-4"></div>
        <p className="text-gray-700 sm:text-[17px] leading-relaxed">
          Join Our Team! We're always looking for talented individuals to grow
          with us. If you're interested in any of the positions listed below,
          please complete the application and submit it in person or via email
          <a href="#" className="text-[#36366d] font-bold mx-1">
          jandrnwconstruction@gmail.com
          </a>
        </p>

        {/* Job Listings */}
        <ul className="mt-6 space-y-3 text-left text-gray-800 ">
          {jobPositions.map((job, index) => (
            <li key={index} className="flex items-center space-x-2">
              <TiTick className="h-6 w-8 text-[#36366d]" />
              <span className="text-[14px] text-[#666666]">{job}</span>
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
