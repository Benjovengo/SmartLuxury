import React, { useRef } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { newMessage, myMessages } from "../scripts/messages";


const Contact = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const subjectRef = useRef("");
  const messageRef = useRef("");


  const addParagraphs = async () => {
    let data = await myMessages();
    let individualMessage
    let newParagraph
    for (let i=0; i< data.length; i++){
      individualMessage = data[i]
      newParagraph = document.createElement("p");
      newParagraph.innerHTML = "Name: " + individualMessage[1];
      document.body.appendChild(newParagraph);
      newParagraph = document.createElement("p");
      newParagraph.innerHTML = "Email: " + individualMessage[2];
      document.body.appendChild(newParagraph);
      newParagraph = document.createElement("p");
      newParagraph.innerHTML = "Subject: " + individualMessage[3];
      document.body.appendChild(newParagraph);
      newParagraph = document.createElement("p");
      newParagraph.innerHTML = "Body: " + individualMessage[4];
      document.body.appendChild(newParagraph);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    let getName = e.target.nameInput.value;
    let getEmail = e.target.emailInput.value;
    let getSubject = e.target.subjectInput.value;
    let getBody = e.target.bodyInput.value;
    
    newMessage(getName, getEmail, getSubject, getBody);
    alert("Your message has been sent!! I'll get in touch soon.")
  };

  return (
    <>
      <CommonSection title="Contact Us" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" className="m-auto text-center">
              <h2>Drop a Message</h2>
              <p>
                Please, feel free to leave a message. I'll be the only one reading it. And, of course, this message is also going to be placed in the blockchain!
              </p>
              <p><b>Warning!!</b> Only the last message will be read!</p>
              <div className="contact mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="form__input">
                    <input
                      name="nameInput"
                      maxLength="100"
                      type="text"
                      placeholder="Enter your name"
                      ref={nameRef}
                    />
                  </div>
                  <div className="form__input">
                    <input
                      name="emailInput"
                      maxLength="100"
                      type="email"
                      placeholder="Enter your email"
                      ref={emailRef}
                    />
                  </div>
                  <div className="form__input">
                    <input
                      name="subjectInput"
                      maxLength="150"
                      type="text"
                      placeholder="Enter subject"
                      ref={subjectRef}
                    />
                  </div>
                  <div className="form__input">
                    <textarea
                      name="bodyInput"
                      maxLength="500"
                      rows="7"
                      placeholder="Write message"
                      ref={messageRef}
                    ></textarea>
                  </div>

                  <button
                    className="send__btn"
                    style={{
                      background: "#F89104",
                      border: "none",
                      color: "#fff",
                      padding: "7px 25px",
                      borderRadius: "5px",
                      marginTop: "20px",
                    }}
                  >
                    Send a Message
                  </button>
                </form>
              </div>
            </Col>
          </Row>
          <button id="addParagraphsButton" onClick={() => addParagraphs()}>My Messages</button>
        </Container>
      </section>
    </>
  );
};

export default Contact;