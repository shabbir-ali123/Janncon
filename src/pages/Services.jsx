import React from 'react'
import Servicehero from '../component/Services/Servicehero'
import ConstructionServices from '../component/constructionServices/ConstructionServices'
import ChooseUs from '../component/chosseUs/ChooseUs'
// import Restoration from '../component/restoration/Restoration'

function Services() {
  return (
    <>
        <Servicehero />
        <ConstructionServices/>
        <ChooseUs />
        {/* <Restoration /> */}
    </>
  )
}

export default Services