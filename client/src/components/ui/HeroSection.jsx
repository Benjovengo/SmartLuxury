import React from 'react'
import { Container, Row, Col} from 'reactstrap'
import { Link } from 'react-router-dom'

import "./hero-section.css"
import heroImg from '../../assets/images/hero.png'

const HeroSection = () => {
  return (
    <>
      <section className="hero__section">
        <Container>
          <Row className='hero__content'>
            <h2>Renew your collection<br/>
              <span>buy and sell</span> luxury items
            </h2>
          </Row>
          <Row className='hero__content d-flex align-items-center'>
              <p>Buying a product has never been safer. The authenticity is guaranteed by tracking the origin of all the products! </p>
          </Row>
          <Row className='hero__content'>
            <button className=' explore__create__btn'>
              <Link to='/market'>Explore</Link>
            </button>
          </Row>
        </Container>      
      </section>
    </>
  )
}

export default HeroSection