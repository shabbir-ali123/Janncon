import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import logo from "../../assets/images/logobg.png"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-[#001F3F] pt-[40px] px-40 py-8 text-[white] text-[17px] font-worksans grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div className="leading-7">
          <div>
            <img src={logo} alt="Logo" className="h-[100px] w-[auto]" />
          </div>
          <div className="flex pt-[30px] gap-[20px]">
            <div className="px-[15px] py-[15px] rounded-full bg-[white] text-[#333645]">
              <a 
                            href="https://www.facebook.com/JRNWConstruction" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <FaFacebookF />
                          </a>
              
            </div>
            <div className="px-[15px] py-[15px] rounded-full bg-[white] text-[#333645]">
              <Link to="/contact">
              <MdOutlineEmail />
              </Link>
             
            </div>
          </div>
        </div>
        <div>
          <p className=" text-[17px] font-medium">Projects</p>
          <ul className=" text-[17px] font-normal flex flex-col pt-[20px] leading-7">
            <a href="#">Tabor Heights</a>
            <a href="#">gateway hearing aid</a>
            <a href="#">palisade terr dr</a>
            <a href="#">ne 90th ave</a>
           
          </ul>
        </div>
        <div>
          <p className=" text-[17px] font-medium">Services</p>
          <ul className="flex flex-col pt-[20px] text-[17px] font-normal leading-7">
            <Link to="/services">Mitigation and restoration </Link>
            <Link to="/services">Drywall/painting </Link>
            <Link to="/services">Interior/exterior finishing </Link>
            <Link to="/services">Emergency services</Link>
            <Link to="/services">fire damage restoration</Link>
          </ul>
        </div>
        <div className="mt-[20px] md:text-right text-[17px] font-normal">
          <p>CCB</p>
          <p>​#232708</p>
          <p>jandrnwconstruction@gmail.com</p>
          <div className="mt-20px text-[20px] font-normal">
            <p className="pt-[20px]">© 2025 J&R NW Construction LLC</p>
            <p className="pt-[5px]">5039982340</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
