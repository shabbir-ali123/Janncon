import React from 'react'
import Gallery from '../92ndAve/Gallery';
import Testimonials from "./Testimonials";
import brandbg from '../../assets/images/brandbg.jpg';
import holcomb1 from '../../assets/images/new-1.jpeg'
import holcomb2 from '../../assets/images/new-2.jpeg'
import holcomb3 from '../../assets/images/new-4.jpeg'
import holcomb4 from '../../assets/images/new-5.jpeg'
import holcomb5 from '../../assets/images/new-6.jpeg'
import holcomb6 from '../../assets/images/new-7.jpeg'
import holcomb7 from '../../assets/images/new-8.jpeg'
import holcomb8 from '../../assets/images/new-9.jpeg'
import holcomb9 from '../../assets/images/new-10.jpeg'

const images = [holcomb1, holcomb2, holcomb3, holcomb4, holcomb5, holcomb6, holcomb7, holcomb8, holcomb9];
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


function Holcomb() {
  return (
    <div>
      <Gallery
        title="Holcomb"
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

export default Holcomb