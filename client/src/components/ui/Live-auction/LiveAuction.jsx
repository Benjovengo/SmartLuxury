import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

import './live-auction.css'

import NftCard from '../Nft-card/NftCard'
//import { NFT__DATA } from '../../../assets/data/data.js' // get data from IPFS
//import { NFT__DATA } from '../../../assets_test/data/data.js' // test data

const LiveAuction = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg='12' className='mb-4'>
            <div className="live_auction__top d-flex align-items center justify-content-between">
              <h3>Live Auction</h3>
              <span>
                <Link to='/market'>
                  Explore more
                </Link>
              </span>
            </div>
          </Col>

          <Col lg='3'>
            {
              <NftCard />
              /* NFT__DATA.slice(0,4).map((item)=>(
                <NftCard key={item.id} itm={item} />
              )) */
            }
          </Col>

        </Row>
      </Container>
    </section>
  )
}

export default LiveAuction