import React from 'react'
import { Container, Row, Col} from 'reactstrap'
import { Link } from 'react-router-dom'

import "./hero-section.css"
import heroImg from '../../assets/images/hero.png'

const HeroSection = () => {
  return (
    <section className="hero__section">
      <Container>
        <Row>
          <Col  lg='6' md='6'>
            <div className="hero__content">
              <h2>Renew your collection<br/>
                <span>buy and sell</span> luxury items
              </h2>
              
              <p>Buying a product has never been safer. The authenticity is guaranteed by tracking the origin of the product you are buying.</p>
              
              <div className="hero__btns d-flex align-items-center gap-4">
                <button className=' explore__create__btn  d-flex align-items-center gap-2'>
                  <Link to='/market'>Explore</Link>
                </button>
                <button className=' explore__create__btn  d-flex align-items-center gap-2'>
                  <Link to='/create'>Sell</Link>
                </button>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="hero__img">
              {/* <img src={''} alt="" className="w-100" /> */}
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  )
}

export default HeroSection