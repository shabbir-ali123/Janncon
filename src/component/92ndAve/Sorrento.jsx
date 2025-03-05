  import React from 'react'
  import Gallery from '../92ndAve/Gallery';
  import Testimonials from "./Testimonials";
  import brandbg from '../../assets/images/brandbg.jpg';
  import Sorrento1 from '../../assets/images/sorrento-fi.jpg'
  import Sorrento2 from '../../assets/images/sorrento2.jpg'
  import Sorrento3 from '../../assets/images/sorrento3.jpg'
  import Sorrento4 from '../../assets/images/courtyard4.jpg'
  import Sorrento5 from '../../assets/images/courtyard5.jpg'
  import Sorrento6 from '../../assets/images/courtyard6.jpg'
  import Sorrento7 from '../../assets/images/courtyard7.jpg'
  import Sorrento8 from '../../assets/images/courtyard8.jpg'

  const images = [Sorrento1, Sorrento2, Sorrento3, Sorrento4, Sorrento5, Sorrento6, Sorrento7, Sorrento8];

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

  function Sorrento() {
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

  export default Sorrento