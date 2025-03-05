import React from "react";
import teamimage from "/src/assets/images/new-5.jpeg";
import { Link } from "react-router-dom";

function Team() {
  return (
    <div
      className="relative bg-cover bg-center font-worksans py-16 px-6"
      style={{ backgroundImage: `url(${teamimage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative md:w-[61%] mx-auto text-center z-10">
        <h2 className="text-[24px] md:text-[44px] text-white uppercase">
          We Work For You
        </h2>
        <div className="mt-[10px] w-[30%] h-[1px] bg-gray-300 mx-auto"></div>
        <p className="text-white text-[16px] md:text-[20px] mt-3">
          At J&R NW Construction, our mission is to provide comprehensive water
          mitigation and restoration services that restore peace of mind and
          property value. From interior to exterior, we are dedicated to
          delivering exceptional craftsmanship and complete solutions from start
          to finish. We prioritize safety, efficiency, and customer
          satisfaction, ensuring every project is completed with integrity and
          excellence. Our commitment is to rebuild not just structures, but also
          the trust and confidence of the communities we serve.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex max-sm:flex-row justify-center gap-4">
          <button className="flex-1 bg-[white] text-[18px] text-black py-2 px-6 rounded transition">
            Learn More
          </button>
          <Link
            to="/Contact"
            className="flex-1 bg-[white] text-[18px] text-black py-2 px-6 rounded transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Team;
