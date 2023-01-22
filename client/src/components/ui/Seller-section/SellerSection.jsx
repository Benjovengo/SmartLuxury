import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import './seller.css'

import { SELLER__DATA } from '../../../assets/data/data'

const SellerSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="seller__section-title">
              <h3>Most Recent Accounts</h3>
            </div>
          </Col>

          {
            SELLER__DATA.map((item) => (
              <Col key={item.id} className="col-3 d-flex align-items-center gap-3">
                <div className="align-items-center gap-3">
                  <img src={item.sellerImg} alt="" className="seller__img" />
                </div>
                <div className='seller__content'>
                  <h5>{item.firstname}</h5>
                  <h6>{item.lastname}</h6>
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