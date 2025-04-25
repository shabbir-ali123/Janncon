import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import logo from "../../assets/images/logobg.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#001F3F] pt-10 px-4 md:px-[200px] py-8 text-white text-[17px] font-worksans grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {/* Logo & Social Links */}
      <div className="leading-7 text-center md:text-left">
        <div>
          <img src={logo} alt="Logo" className="h-[80px] mx-auto md:mx-0" />
        </div>
        <div className="flex justify-center md:justify-start pt-6 gap-4">
          <a 
            href="https://www.facebook.com/JRNWConstruction" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#333645] transition hover:bg-gray-200"
          >
            <FaFacebookF size={20} />
          </a>
          <Link 
            to="/contact"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#333645] transition hover:bg-gray-200"
          >
            <MdOutlineEmail size={20} />
          </Link>
        </div>
      </div>

      {/* Projects */}
      <div className="text-center md:text-left">
        <p className="text-[17px] font-medium">Projects</p>
        <ul className="text-[17px] font-normal flex flex-col pt-5 leading-7">
          <li><a href="#">Tabor Heights</a></li>
          <li><a href="#">Gateway Hearing Aid</a></li>
          <li><a href="#">Palisade Terr Dr</a></li>
          <li><a href="#">NE 90th Ave</a></li>
        </ul>
      </div>

      {/* Services */}
      <div className="text-center md:text-left">
        <p className="text-[17px] font-medium">Services</p>
        <ul className="flex flex-col pt-5 text-[17px] font-normal leading-7">
          <li><Link to="/services">Mitigation and Restoration</Link></li>
          <li><Link to="/services">Drywall/Painting</Link></li>
          <li><Link to="/services">Interior/Exterior Finishing</Link></li>
          <li><Link to="/services">Emergency Services</Link></li>
          <li><Link to="/services">Fire Damage Restoration</Link></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="text-center md:text-right">
        <p>CCB</p>
        <p>#232708</p>
        <p>jandrnwconstruction@gmail.com</p>
        <div className="mt-5 text-[17px]">
          <p className="pt-5">© 2025 J&R NW Construction LLC</p>
          <p className="pt-2">503-998-2340</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
