import React, { useLayoutEffect } from 'react'

import HeroSection from '../components/ui/HeroSection'
import RecentItems from '../components/ui/RecentItems/RecentItems'


const Home = () => {

  // @notice scroll to the top of the page
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  return (
    <>
      <HeroSection />
      <RecentItems />
    </>
  )
}

export default Home