import React from "react";
import { FaCheck } from "react-icons/fa";

const Restoration = () => {
  return (
    <>
      <div className="px-[16px] flex flex-col pb-[50px] font-worksans">
        <div className="flex items-center flex-col pt-[50px] pb-[36px] gap-[10px]">
          <h1 className="text-[36px] md:text-[44px] text-center">24/7 Restoration Services</h1>
          <div className="w-[100%] max-w-[12%] h-[1px] bg-black"></div>
        </div>
        <div className="text-[center] flex flex-col items-center gap-[10px]">
          <p className="text-center md:w-[1180px] text-[#292B37] text-[18px]">
            Each of our Restoration Services team members are industry
            professionals with extensive experience across project types
            including <span className="text-[#FFAA06]">reconstruction</span> &{" "}
            <span className="text-[#FFAA06]">rehabilitation.</span> Our
            employees are IICRC certified in fire, flood, mold, biohazard, and
            storm damage.
          </p>
          <p className="text-[18px] text-[#292B37]">
            Below is a list of our restoration services:
          </p>
        </div>
        <div className="flex justify-center pt-[40px]">
          <div className="">
            <div className="flex gap-[20px] md:pr-[270px] items-center text-[#666666] pb-[10px] text-[18px]">
              <FaCheck style={{ color: "yellow" }} />
              24/7 Emergency Response – 365 Days A Year
            </div>
            <div className="flex gap-[20px] md:pr-[270px] items-center text-[#FFAA06] pb-[10px] text-[18px]">
              <FaCheck style={{ color: "yellow" }} />
              Dry Outs, Dehumidification, & Water Extraction
            </div>
            <div className="flex gap-[20px] md:pr-[270px] items-center  text-[#FFAA06] pb-[10px] text-[18px]">
              <FaCheck style={{ color: "yellow" }} />
              Mold Remediation
            </div>
            <div className="flex gap-[20px] md:pr-[270px] items-center  text-[#FFAA06] pb-[10px] text-[18px]">
              <FaCheck style={{ color: "yellow" }} />
              Biohazard Remediation & Disposalr
            </div>
            <div className="flex gap-[20px] md:pr-[270px] items-center text-[#666666] pb-[10px] text-[18px]">
              <FaCheck style={{ color: "yellow" }} />
              Leak Investigation
            </div>
            <div className="flex gap-[20px] md:pr-[270px] items-center text-[#666666] pb-[10px] text-[18px]">
              <FaCheck style={{ color: "yellow" }} />
              Board Up Services & Roof Tarping
            </div>
            <div className="flex gap-[20px] md:pr-[270px] items-center text-[#666666] pb-[10px] text-[18px]">
              <FaCheck style={{ color: "yellow" }} />
              Vehicle Impact, Structural Damage, & Earthquake Damage
            </div>
            <div className="flex gap-[20px] md:pr-[270px] items-center text-[#666666] pb-[10px] text-[18px]">
              <FaCheck style={{ color: "yellow" }} />
              Quality Interior & Exterior Build Back
            </div>
            <div className="flex gap-[20px] md:pr-[270px] items-center text-[#666666] pb-[10px] text-[18px]">
              <FaCheck style={{ color: "yellow" }} />
              Insurance Repairs – We Fight For You & Represent Your Interests!
            </div>
            <div className="flex gap-[20px] md:pr-[270px] items-center  text-[#FFAA06] pb-[10px] text-[18px]">
              <FaCheck style={{ color: "yellow" }} />
              Fire & Smoke Damage Repairs
            </div>
            <div className="flex gap-[20px] md:pr-[270px] items-center  text-[#FFAA06] pb-[10px] text-[18px]">
              <FaCheck style={{ color: "yellow" }} />
              Renovation & Repair for HOAS
            </div>
            <div className="flex gap-[20px] md:pr-[270px] items-center  text-[#FFAA06] pb-[10px] text-[18px]">
              <FaCheck style={{ color: "yellow" }} />
              Commercial Plumbing
            </div>
            <div className="flex gap-[20px] md:pr-[270px] items-center  text-[#FFAA06] pb-[10px] text-[18px]">
              <FaCheck style={{ color: "yellow" }} />
              Apartment Renovation & Repair
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Restoration;
