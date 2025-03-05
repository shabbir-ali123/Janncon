import React from 'react';
import ContactForm from './Contactform';
import { TiSocialFacebook } from "react-icons/ti";

function Getstart() {
  return (
    <div className="md:py-20 py-10 font-worksans bg-primary">
      <p className="text-[17px] text-white sm:w-[60%] mx-auto text-center">
        <span className="text-white"> Get a FREE estimate today! Let us assess the issue, provide expert repairs, and ensure it never happens again.</span>
      </p>
      <div className='flex mt-20 max-w-6xl mx-auto justify-evenly gap-5 items-center md:flex-row max-sm:flex-col max-md:flex-col'>
        <div className="flex flex-col mx-auto sm:w-[60%] max-sm:w-[100%]">
          {/* Image Container with Overlay */}
          <div className="relative sm:w-[400px] h-64 sm:h-80 md:h-96 lg:h-[400px] max-md:mx-auto">
            <img src="/src/assets/images/new-9.jpeg" alt="" className="w-full h-full object-cover" />
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="max-md:mx-auto">
            <h2 className="text-[26px] text-white my-[20px]">J&R NW Construction LLC</h2>
          </div>
          <div className='bg-gray-900 w-[50px] h-[50px] rounded-full hover:bg-[#7f808b] transition duration-300 mt-5 max-md:mx-auto'>
            <a 
              href="https://www.facebook.com/JRNWConstruction" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <TiSocialFacebook className='h-[45px] w-[45px] mx-auto mt-[2px] text-[#ffaa27] hover:text-[#292b37] transition duration-300' />
            </a>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default Getstart;
