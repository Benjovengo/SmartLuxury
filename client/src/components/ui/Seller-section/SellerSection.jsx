import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import './seller.css'

import { SELLER__DATA } from '../../../assets_test/data/data'


const SellerSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="seller__section-title">
              <h3>Top Sellers</h3>
            </div>
          </Col>

          {
            SELLER__DATA.map((item) => (
              <Col lg="2" md="3" sm="4" xs="6" key={item.id} className="mb-4">
                <div className="single__seller-card d-flex align-items-center gap-3">
                  <div className="seller__img">
                    <img src={item.sellerImg} alt="" className="w-100" />
                  </div>

                  <div className="seller__content">
                    <h6>{item.sellerName}</h6>
                    <h6>{item.currentBid} ETH</h6>
                  </div>
                </div>
              </Col>
            ))
          }

          

        </Row>
      </Container>
    </section>
  )
}

export default SellerSection