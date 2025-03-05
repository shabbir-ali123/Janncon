import React from 'react';
import Banner from './Banner';
import Team from './Team';
import Contact from "./Contact";
import Projects from './Projects';

const   Reconstruction = () => {
    return (
        <section>
        <div>
            <Banner />
            <Team />
            <Contact />
            <Projects />
        </div>
        </section>
    );
};

export default Reconstruction;