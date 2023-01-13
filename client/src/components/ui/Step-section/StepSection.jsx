import React from 'react'
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import "./step-section.css";



const STEP__DATA = [
  {
    title: "Setup your wallet",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit eligendi, facilis voluptatum fugit illum ",
    icon: "ri-wallet-line",
    link: "/wallet",
  },

  {
    title: "Validate your products",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit eligendi, facilis voluptatum fugit illum ",
    icon: "ri-layout-masonry-line",
    link: "/register",
  },

  {
    title: "Register your products",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit eligendi, facilis voluptatum fugit illum ",
    icon: "ri-image-line",
    link: "/register",
  },

  {
    title: "List them for sale",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit eligendi, facilis voluptatum fugit illum ",
    icon: "ri-list-check",
    link: "/create",
  },
];




const StepSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-4">
            <h3 className="step__title">Register and sell your luxury items</h3>
          </Col>

          {
            STEP__DATA.map((item, index) => (
              <Col lg="3" md="4" sm="6" key={index} className="mb-4">
                <div className="single__step__item">
                  <span>
                    <i className={item.icon}></i>
                  </span>
                  <div className="step__item__content">
                    <h5>
                      <Link to={item.link}>{item.title}</Link>
                    </h5>
                    <p className="mb-0">{item.desc}</p>
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

export default StepSection