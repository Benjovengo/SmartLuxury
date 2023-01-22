import React, { useRef, useState } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "../styles/account.css"


import { addAccount } from "../scripts/addAccount";
import { getCustomerData } from "../scripts/getAccountInfo";

// Provisory Data
import ava01 from "../assets/images/ava-01.png";
import ava02 from "../assets/images/ava-02.png";
import ava03 from "../assets/images/ava-03.png";
import ava04 from "../assets/images/ava-04.png";
import ava05 from "../assets/images/ava-05.png";
import ava06 from "../assets/images/ava-06.png";


const overlay = () => {
  addingOverlay = document.getElementById('addAvatarOverlay');
  addingOverlay.classList.remove('animateRemovingOverlay');
  addingOverlay.classList.add('animateAddingOverlay');
}

// Validate email field
function ValidateEmail(mail)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}




const Account = () => {
  // Hooks
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const physicalAddressRef = useRef("");
  const poBoxRef = useRef("");

  let avatar01 = "https://github.com/Benjovengo/SmartLuxury/raw/master/client/src/assets_test/images/ava-01.png"
  let avatar02 = "https://github.com/Benjovengo/SmartLuxury/raw/master/client/src/assets_test/images/ava-02.png"
  let avatar03 = "https://github.com/Benjovengo/SmartLuxury/raw/master/client/src/assets_test/images/ava-03.png"
  let avatar04 = "https://github.com/Benjovengo/SmartLuxury/raw/master/client/src/assets_test/images/ava-04.png"
  let avatar05 = "https://github.com/Benjovengo/SmartLuxury/raw/master/client/src/assets_test/images/ava-05.png"
  let avatar06 = "https://github.com/Benjovengo/SmartLuxury/raw/master/client/src/assets_test/images/ava-06.png"



  const customerData = getCustomerData.then((result) => {
    return result;
  })
  

  const [avatarUrl, setAvatarUrl] = useState(avatar01);

  const handleSubmit = (e) => {
    e.preventDefault();

    //getAccountInfo();
    document.getElementById('first_name').innerHTML = e.target.firstName.value;
    document.getElementById('last_name').innerHTML = e.target.lastName.value;
    document.getElementById('email_address').innerHTML = e.target.email.value;
    document.getElementById('physical_address').innerHTML = e.target.physicalAddress.value;
    document.getElementById('po_box').innerHTML = e.target.poBox.value;
    document.getElementById('account_avatar').src = avatarUrl

    if (ValidateEmail(document.getElementById('email_address').innerHTML)){
      addAccount(e.target.firstName.value, e.target.lastName.value, avatarUrl, e.target.email.value, e.target.physicalAddress.value, e.target.poBox.value);
    }
  };


  return (
    <>
      <CommonSection title="Sign Up" />

      {/* CHOOSE AVATAR OVERLAY SECTION */}
      <div className="chooseAvatarOverlay" id="addAvatarOverlay">
        <section>
          <Row className="m-auto text-center">
            <h2 className="text-light">Choose an avatar</h2>
            <Col className="m-auto text-center">
              <img src={ava01} alt="" className="avatar__list" onClick={()=> {setAvatarUrl(avatar01); addingOverlay.classList.add('animateRemovingOverlay'); document.getElementById('account_avatar').src = avatar01;}} />
              <img src={ava02} alt="" className="avatar__list" onClick={()=> {setAvatarUrl(avatar02); addingOverlay.classList.add('animateRemovingOverlay'); document.getElementById('account_avatar').src = avatar02;}} />
              <img src={ava03} alt="" className="avatar__list" onClick={()=> {setAvatarUrl(avatar03); addingOverlay.classList.add('animateRemovingOverlay'); document.getElementById('account_avatar').src = avatar03;}} />
              <img src={ava04} alt="" className="avatar__list" onClick={()=> {setAvatarUrl(avatar04); addingOverlay.classList.add('animateRemovingOverlay'); document.getElementById('account_avatar').src = avatar04;}} />
              <img src={ava05} alt="" className="avatar__list" onClick={()=> {setAvatarUrl(avatar05); addingOverlay.classList.add('animateRemovingOverlay'); document.getElementById('account_avatar').src = avatar05;}} />
              <img src={ava06} alt="" className="avatar__list" onClick={()=> {setAvatarUrl(avatar06); addingOverlay.classList.add('animateRemovingOverlay'); document.getElementById('account_avatar').src = avatar06;}} />
            </Col>
          </Row>
          <Row className="m-auto w-25 mt-5">
            <button className="overlay__cancel" onClick={()=> {
              //addingOverlay.classList.remove('animateAddingOverlay');
              addingOverlay.classList.add('animateRemovingOverlay');
              }}>Cancel</button>
          </Row>
        </section>
      </div>

      <section>
        <Container>
          <Row>
            
            <Col className="m-auto text-center container__settings">
              <div className="preview__info">
                <h2>Info Card</h2>
                <h4>Preview</h4>
                <Row>
                  <Col>
                    <img src={ava01} alt="" id="account_avatar" className="w-100 preview__avatar" title="Change avatar" onClick={()=> overlay()}/>
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

let addingOverlay = document.getElementById('addAvatarOverlay');
