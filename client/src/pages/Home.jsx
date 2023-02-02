import React, { useLayoutEffect } from 'react'

import HeroSection from '../components/ui/HeroSection'
import LiveAuction from '../components/ui/Live-auction/LiveAuction'


const Home = () => {

  // @notice scroll to the top of the page
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  return (
    <>
      <HeroSection />
      <LiveAuction />
    </>
  )
}

export default Home