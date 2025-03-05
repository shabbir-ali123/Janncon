import { useState } from "react";
import bgimage1 from "/src/assets/images/mitigationnew.jpeg";
import bgimage2 from "/src/assets/images/new-10.jpeg";
import bgimage3 from "/src/assets/images/new-7.jpeg";
import { useNavigate } from "react-router-dom";

function Home() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const handleImgClick = () => {
    navigate('/Services'); 
  };

  return (
    <>
    <div className="px-3 bg-primary grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-2 gap-2 h-[70vh] font-worksans">
      {[{ image: bgimage1, title: "Mitigation / Restoration", text: "24/7 Mitigation & Restoration" },
        { image: bgimage2, title: "Construction", text: "Specializing in HOA & multi-family repairs from small projects to full rehabs" },
        { image: bgimage3, title: "Projects", text: "Specializing in Apartment repairs from small projects to full rehabs" }
      ].map((item, index) => (
        <div
          key={index}
          className={`bg-cover max-sm:row-span-1 bg-center w-full h-full flex items-center justify-center relative overflow-none ${
            index === 0 ? "row-span-2" : ""
          }`}
          style={{ backgroundImage: `url(${item.image})` }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={handleImgClick}
        >
       
          <div
            className={`md:absolute inset-0 bg-black transition-opacity duration-300 ${
              hoveredIndex === index ? "bg-opacity-50 backdrop-blur-md" : "bg-opacity-0"
            }`}
          ></div>

       
          <div className="md:absolute flex flex-col items-center text-center">
            <h1 className="text-white text-[24px] md:text-[38px]">{item.title}</h1>
            <p
              className={`text-white text-[16px] md:text-[18px] w-[90%] text-center transition-opacity duration-300 ${
                hoveredIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Home;
