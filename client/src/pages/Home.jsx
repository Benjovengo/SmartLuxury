import React from 'react'
import { Container } from 'reactstrap'

import HeroSection from '../components/ui/HeroSection'
import LiveAuction from '../components/ui/Live-auction/LiveAuction'
import SellerSection from '../components/ui/Seller-section/SellerSection'
import TrendingSection from '../components/ui/Trending-section/Trending'
import StepSection from '../components/ui/Step-section/StepSection'

const Home = () => {
  return (
    <>
      <HeroSection />
      <LiveAuction />
      <SellerSection />
      {/* <TrendingSection /> */}
      <StepSection />
    </>
  )
}

export default Home