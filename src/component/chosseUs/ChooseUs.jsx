import React, { useState } from 'react';
import { FaRegLightbulb } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import { Link } from "react-router-dom";
const ChooseUs = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabContent = [
        {
            icon: <FaRegLightbulb className="text-2xl"/>, 
            title: "Knowledge",
            content: "Our team of experienced owners, project managers, and carpenters bring decades of expertise in construction defect repair, ensuring tailored solutions for every client's unique needs.",
        },
        {
            icon: <FiMessageCircle className="text-2xl"/>, 
            title: "Communication",
            content: "We remain engaged throughout the entire process with incredible attention to detail. Our goal is to complete your project ahead of schedule and under budget. Check out our testimonials and see for yourself!"
        },
        {
            icon: <BsEmojiSmile className="text-2xl"/>, 
            title: "Satisfaction",
            content: "We take pride in maintaining a reputation for being friendly, accommodating, and transparent with our clients. We consistently exceed expectations, ensuring all needs are met and client satisfaction is achieved.",
        },
    ];

    return (
        <div className="bg-primary pb-[50px] font-worksans border-white  border-t-2 border-b-2">
            <div className="flex flex-col gap-6 py-20 items-center">
                <h2 className="text-4xl font-normal text-white">WHY CHOOSE US?</h2>
                <div className="w-full max-w-xs h-[1px] bg-white"></div>
            </div>

            {/* Tabs */}
            <div className="max-sm:px-4 flex max-sm:flex-col gap-1 justify-center mb-6">
                {tabContent.map((tab, index) => (
                    <button
                        key={index}
                        className={`py-2 px-4 flex items-center text-lg font-semibold focus:outline-none transition-colors duration-300  ${
                            activeTab === index
                                ? "bg-[white] text-black"
                                : "text-white bg-[#404353] hover:text-[black]"
                        }`}
                        onClick={() => setActiveTab(index)}
                        aria-selected={activeTab === index}
                    >
                        <div className="mr-2">{tab.icon}</div>
                        {tab.title}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-4 p-4 flex justify-center flex-col items-center">
                <div className="md:w-[1062px] text-center text-white transition-opacity duration-500 opacity-0" 
                     style={{ opacity: activeTab === null ? 0 : 1 }}>
                    <p className="transition-opacity duration-500">{tabContent[activeTab].content}</p>
                </div>
                <div className="pt-[40px]">
                    <button className="px-4 py-2 bg-[white] text-black hover:bg-yellow-600 hover:text-white">
                        <Link to="/contact">
                        LET'S WORK TOGETHER
                        </Link>
                        
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChooseUs;
