import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

import './recent-items.css'

import NftCard from '../Nft-card/NftCard'
//import { NFT__DATA } from '../../../assets/data/data.js' // get data
import { NFT__DATA } from '../../../assets/data/data.js' // test data

const RecentItems = () => {
  return (
    <>
      <section className="selling__section">
        <Container>
          <Row className='selling__content justify-content-center'>
            <Col xs="12" className="text-center">
              <h3>What's new?</h3>
            </Col>
          </Row>
          <Row className='selling__content justify-content-center'>
            <Col xs="12" className="text-center">
              <Link className='link__btn' to='/market'><button className="explore__more__btn">View More Items</button></Link>
            </Col>
          </Row>

          <Row>
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
    </>

  )
}

export default RecentItems