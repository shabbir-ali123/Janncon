import React from 'react'
import Gallery from '../92ndAve/Gallery';
import Testimonials from "./Testimonials";
import brandbg from '../../assets/images/brandbg.jpg';
import Courtyard1 from '../../assets/images/courtyard 1.jpg'
import Courtyard2 from '../../assets/images/courtyard2.jpg'
import Courtyard3 from '../../assets/images/courtyard3.jpg'
import Courtyard4 from '../../assets/images/courtyard4.jpg'
import Courtyard5 from '../../assets/images/courtyard5.jpg'
import Courtyard6 from '../../assets/images/courtyard6.jpg'
import Courtyard7 from '../../assets/images/courtyard7.jpg'
import Courtyard8 from '../../assets/images/courtyard8.jpg'


const images = [Courtyard1, Courtyard2, Courtyard3, Courtyard4, Courtyard5, Courtyard6, Courtyard7, Courtyard8];

const testimonialsData = [
  {
      name: "Robbert",
      position: "CTO, Robert Consultancy",
      quote: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus.",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
  },
  {
      name: "Mia Brown",
      position: "Marketing Manager at Stech",
      quote: "Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus.",
      image: "https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  }
];

function Courtyard() {
  return (
    <div>
      <Gallery
        title="Courtyard at Springville HOA"
        description="Project Description"
        images={images}
        backgroundImage={brandbg}
      />
      <Testimonials
        title="What our clients say"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt ex placeat modi magni quia error alias, adipisci rem similique."
        testimonials={testimonialsData}
      />
    </div>
  )
}

export default Courtyard