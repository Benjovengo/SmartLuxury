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
              
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo ad fugit at quae saepe perferendis quaerat corrupti temporibus similique nihil?</p>
              
              <div className="hero__btns d-flex align-items-center gap-4">
                <button className=' explore__btn  d-flex align-items-center gap-2'>
                  <Link to='/market'>Explore</Link>
                </button>
                <button className=' explore__btn  d-flex align-items-center gap-2'>
                  <Link to='/create'>Sell</Link>
                </button>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="hero__img">
              <img src={heroImg} alt="" className="w-100" />
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  )
}

export default HeroSection