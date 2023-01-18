import React, { useEffect, useRef } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "../styles/account.css"


import { addAccount } from "../scripts/addAccount";
import { getCustomerData } from "../scripts/GetAccountInfo";

// Provisory Data
import ava05 from "../assets_test/images/ava-05.png";
//import ava05 from "../images/ava-05.png";


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
    document.getElementById('first_name').innerHTML = e.target.firstName.value;
    document.getElementById('last_name').innerHTML = e.target.lastName.value;
    document.getElementById('email_address').innerHTML = e.target.email.value;
    document.getElementById('physical_address').innerHTML = e.target.physicalAddress.value;
    document.getElementById('po_box').innerHTML = e.target.poBox.value;
  };

  return (
    <>
      <CommonSection title="Sign Up" />
      <section>
        <Container>
          <Row>
            
            <Col className="m-auto text-center container__settings">
              <div className="preview__info">
                <h2>Info Card</h2>
                <h4>Preview</h4>
                <Row>
                  <Col>
                    <img src={ava05} alt="" className="w-100 preview__avatar" />
                  </Col>
                  <Col className="m-auto preview__card">
                    <p id="first_name">First name</p>
                    <p> <span id="last_name">Last name</span></p>
                  </Col>
                </Row>
                <div className="info__block">
                  <p><b>Email:</b><br/> <span id="email_address">your.email@provider.com</span></p>
                  <p><b>Address:</b><br/> <span id="physical_address">Your Street, number</span></p>
                  <p><b>P.O. Box:</b><br/> <span id="po_box">11.111-111</span></p>
                </div>
                <div className="metamask__address">
                  <p><b>MataMask Account:</b><br/> 0x70997970C51812...C7d01b50e0d17dc79C8</p>
                </div>
              </div>
            </Col>

            <Col lg="9" md="6" className="m-auto">
              <h2>Personal Info</h2>
              <p className="title__text">
                Your privacy is secured! Only you will be able to see and update your info!
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
                          //id="firstNameInput"
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