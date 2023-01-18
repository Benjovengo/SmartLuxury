import React, { useEffect, useRef } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { addAccount } from "../scripts/addAccount";
import { getCustomerData } from "../scripts/GetAccountInfo";


const Account = () => {
  // Hooks
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const physicalAddressRef = useRef("");
  const poBoxRef = useRef("");

  const customerData = getCustomerData.then((result) => {
    return result;
  })
  


  const handleSubmit = (e) => {
    e.preventDefault();
    addAccount(e.target.firstName.value, e.target.lastName.value, e.target.email.value, e.target.physicalAddress.value, e.target.poBox.value);
    //getAccountInfo();
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
                Don't worry! Your privacy is secured!
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
                          name="firstName"
                          defaultValue={getCustomerData.firstName}
                          ref={firstNameRef}
                        />
                      </Col>
                      <Col>
                      <p>Last Name</p>
                        <input
                          type="text"
                          placeholder="Enter your last name"
                          name="lastName"
                          ref={lastNameRef}
                        />
                      </Col>
                    </Row>

                    <Col>
                    <p>Email</p>
                      <input
                        type="text"
                        placeholder="Enter your email address"
                        name="email"
                        ref={emailRef}
                      />
                    </Col>

                    <Row>
                      <Col>
                        <p>Address</p>
                        <input
                          type="text"
                          placeholder="Enter your address"
                          name="physicalAddress"
                          ref={physicalAddressRef}
                        />
                      </Col>
                      <Col lg="4">
                      <p>P.O. Box</p>
                        <input
                          type="number"
                          placeholder="12345678"
                          name="poBox"
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