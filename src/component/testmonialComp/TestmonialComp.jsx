import React from "react";

const TestmonialComp = () => {
  return (
    <div className="bg-[#333645] flex flex-col items-center pt-[20px] pb-[40px] h-[411px] border-b-[1px] border-white mt-2">
      <div className="text-[44px] text-white flex flex-col items-center">
        <h1 className="pb-[5px]">TESTMONIALS</h1>
        <div className="bg-white w-[55%] h-[1px] my-[16px]"></div>
      </div>
      <div className="md:w-[683px] h-[176px] flex justify-center flex-col gap-[10px]">
        <p className="text-center text-[20px] text-white font-normal">
          "We are very pleased with the final product after painting of our
          condos at Bankside. We want to particularly complement Omar and his
          work crew.
        </p>
        <p className="text-center text-[#FFAA06] text-[18px]">
          <span className="font-semibold">-Christine Gross,</span> Owner
          Meadowbrook Apartments
        </p>
      </div>
      <button className="bg-[white] text-[black] text-center mt-[20px] px-[20px] py-[10px] text-[14px] font-semibold">
        READ MORE FROM OUR HAPPY CUSTOMERS
      </button>
    </div>
  );
};

export default TestmonialComp;
