import React from 'react'
import contactbg from '../../assets/images/new-7.jpeg'

function Contacthero() {
    return (
        <section
            className="relative bg-cover bg-center h-[80vh] flex items-center font-worksans justify-center text-center text-white"
            style={{ backgroundImage: `url(${contactbg})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 px-4 sm:w-[60%] mx-auto">
                <h1 className="md:text-[68px] max-md:text-[52px] max-sm:text-[48px]">Always Ready When You Are</h1>
                <div className="w-[20%] bg-gray-600 h-[2px] mx-auto"></div>
                <p className="mt-4 text-[20px]">
                From Challenges to Solutions – We've Got You Covered
                </p>
            </div>
        </section>
    )
}

export default Contacthero