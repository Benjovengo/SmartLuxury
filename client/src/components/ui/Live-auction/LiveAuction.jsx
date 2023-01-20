import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

import './live-auction.css'

import NftCard from '../Nft-card/NftCard'
//import { NFT__DATA } from '../../../assets/data/data.js' // get data
import { NFT__DATA } from '../../../assets_test/data/data.js' // test data

const LiveAuction = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg='12' className='mb-4'>
            <div className="live_auction__top d-flex align-items center justify-content-between">
              <h3>Recently Added</h3>
              <span className='explore__more'>
                <button className="explore__btn d-flex align-items-center gap-2">
                  <Link to='/market'>More Items</Link>
                </button>
              </span>
            </div>
          </Col>
          
            {
              //<NftCard />
              NFT__DATA.slice(0,4).map((_item)=>(
                <Col lg='3' md='4' sm='6' key={_item.id}>
                  <NftCard key={_item.id} item={_item} />
                </Col>
              ))
            }
          
        </Row>
      </Container>
    </section>
  )
}

export default LiveAuction