import React, { useRef } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";


const Account = () => {
  // Hooks
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const physicalAddressRef = useRef("");
  const poBoxRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <CommonSection title="Sign Up" />
      <section>
        <Container>
          <Row>
            <Col>
              <h2>Info Card</h2>
            </Col>
            <Col lg="9" md="6" className="m-auto">
              <h2>Personal Info</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus ipsum aperiam cumque fugit suscipit animi natus
                nostrum voluptatem iste quam!
              </p>
              <div className="sign__up">
                <form onSubmit={handleSubmit}>
                  <div className="form__input">

                    <Row>
                      <Col lg="4">
                        <p>First Name</p>
                        <input
                          type="text"
                          placeholder="Enter your first name"
                          ref={firstNameRef}
                        />
                      </Col>
                      <Col>
                      <p>Last Name</p>
                        <input
                          type="text"
                          placeholder="Enter your last name"
                          ref={lastNameRef}
                        />
                      </Col>
                    </Row>

                    <Col>
                    <p>Email</p>
                      <input
                        type="text"
                        placeholder="Enter your email address"
                        ref={emailRef}
                      />
                    </Col>

                    <Row>
                      <Col>
                        <p>Address</p>
                        <input
                          type="text"
                          placeholder="Enter your address"
                          ref={physicalAddressRef}
                        />
                      </Col>
                      <Col lg="4">
                      <p>P.O. Box</p>
                        <input
                          type="number"
                          placeholder="12345678"
                          ref={poBoxRef}
                        />
                      </Col>
                    </Row>

                    <button className="submit__btn text-center" type="submit">
                      Submit
                    </button>

                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Account