import React from 'react'
import { Container, Col, Row, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from "react-router-dom";

import "./footer.css"

const MY__ACCOUNT = [
  {
    display: 'Register New Item',
    url: '/create'
  },
  {
    display: 'Your Collection',
    url: '/wallet'
  },
  {
    display: 'Edit Profile',
    url: '/account'
  },
]


const RESOURCES = [
  {
    display: 'Help Desk',
    url: '#'
  },
  {
    display: 'Partnership',
    url: '#'
  },
  {
    display: 'Community',
    url: '#'
  },
  {
    display: 'Activity',
    url: '#'
  },
]


const COMPANY = [
  {
    display: 'About',
    url: '#'
  },
  {
    display: 'Work with Us',
    url: '#'
  },
  {
    display: 'Contact Us',
    url: '/contact'
  },
]


const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg='3' md='6' sm='6'>
            <div className="logo">
              <h2 className='d-flex gap-2 align-items-center'>
                <span>
                  <img src='SmartLuxuryColorLogo.svg' alt='smart luxury logo' className='img__logo' ></img>
                </span>
              </h2>
              <p>This project uses the Goerli test network. To use its functionalities you may need to get some ether for that network. If so, one option is to use <a href="goerlifaucet.com/">Goerli Faucet</a> to get some ethers.</p>
            </div>
          </Col>

          <Col lg='2' md='3' sm='6'>
            <h5>My Account</h5>
            <ListGroup className="list__group">
              {MY__ACCOUNT.map((item, index) => (
                <ListGroupItem key={index} className="list__item">
                  <Link to={item.url}> {item.display} </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          
          <Col lg="2" md="3" sm="6" className="mb-4">
            <h5>Resources</h5>
            <ListGroup className="list__group">
              {RESOURCES.map((item, index) => (
                <ListGroupItem key={index} className="list__item">
                  <Link to={item.url}> {item.display} </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="2" md="3" sm="6" className="mb-4">
            <h5>Company</h5>
            <ListGroup className="list__group">
              {COMPANY.map((item, index) => (
                <ListGroupItem key={index} className="list__item">
                  <Link to={item.url}> {item.display} </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6" sm="6" className="mb-4">
            <h5>Newsletter</h5>
            <input type="text" className="newsletter" placeholder="Email" />
            <div className="social__links d-flex gap-3 align-items-center ">
              <span>
                <a href="https://www.facebook.com" target="_blank">
                  <i className="ri-facebook-line"></i>
                </a>
              </span>
              <span>
                <a href="https://www.instagram.com" target="_blank">
                  <i className="ri-instagram-line"></i>
                </a>
              </span>
              <span>
                <a href="https://www.twitter.com" target="_blank">
                  <i className="ri-twitter-line"></i>
                </a>
              </span>
              <span>
                <a href="https://web.telegram.org" target="_blank">
                  <i className="ri-telegram-line"></i>
                </a>
              </span>
              <span>
                <a href="https://discord.com" target="_blank">
                  <i className="ri-discord-line"></i>
                </a>
              </span>
            </div>
          </Col>

          <Col lg='12' className='mt-4 text-center'>
            <p><b>Warning!!!</b> Please note that <i>Smart Luxury</i> is a fictional brand and should not be used for purchasing or selling any actual products.</p>
          </Col>

          <Col lg='12' className='mt-4 text-center'>
            <p className='copyright'>
              <i className="ri-copyright-fill"></i><i> Developed by Fábio Benjovengo. All rights reserved.</i>
            </p>
          </Col>

        </Row>
      </Container>
    </footer>
  )
}

export default Footer