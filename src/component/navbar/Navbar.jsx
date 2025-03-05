import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Navtop from "./Navtop";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logobg.png"



function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseEnter = (menu) => {
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileDropdownToggle = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <>
      <div className="bg-[#292b37]">
        <Navtop />
      </div>
      <nav className="font-worksans bg-[#001F3F]">
        <div className=" mx-auto py-[15px] md:px-40 max-sm:px-4 w-[100%]">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="h-[53px] flex items-center">
              <img src={logo} alt="Logo" className="h-[100px]" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4 items-center">
              <Link to="/" className="text-white px-4">
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative cursor-pointer"
                onMouseEnter={() => handleMouseEnter("services")}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center px-4">
                  <Link to="/Services" className="text-white">Services</Link>
                  {/* <MdKeyboardArrowDown className="text-white" /> */}
                </div>
                {/* {openDropdown === "services" && (
                  <div className="absolute bg-white z-40 mt-2 py-2 w-[280px] border border-gray-300">
                    {[
                      "Apartment Renovation & Repair",
                      "Biohazard Disposal & Remediation",
                      "Commercial Plumbing Portland",
                      "Commercial Roofing & Siding Repair",
                      "Deck Repair & Remediation",
                      "Renovation & Repair for HOAs",
                      "Water Damage Restoration",
                      "Water, Mold, & Hazmat Remediation",
                    ].map((item, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block text-gray-800 px-4 py-2 transition-colors border-b border-gray-300"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )} */}
              </div>

           

              <Link to="/projects" className="text-white px-4">
                Our Project
              </Link>
             
              <Link to="/contact" className="text-white px-4">
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <div onClick={toggleMobileMenu} className="text-white focus:outline-none cursor-pointer">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden bg-[#292b37] ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="px-4 py-3 space-y-2">
            <Link to="/" className="block text-white">
              Home
            </Link>

            {/* Mobile Services Dropdown */}
            <div
              onClick={() => handleMobileDropdownToggle("services")}
              className=" text-white flex justify-between items-center cursor-pointer py-2"
            >
              Services <MdKeyboardArrowDown className="text-white" />
            </div>
            {openDropdown === "services" && (
              <div className="bg-white py-2 w-full">
                {[
                  "Mitigation and restoration",
                  "Flooring/carpet",
                  "Drywall/painting",
                  "interior/exteroir finishing",
                  "Framing",
                  "Emergency services",
                ].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-gray-900 px-4 py-2 border-b border-gray-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}

           

            <Link to="/services" className="block text-white">
              Our Project
            </Link>
        
            <Link to="/Contact" className="block text-white">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
