import React, { useRef } from "react";

import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftSellCard";
import img from "../assets/images/img-01.png";
import avatar from "../assets/images/ava-01.png";
import { randomPhoto } from "../scripts/randomProduct";

import "../styles/create-item.css";

import { registerProduct } from "../scripts/addProduct";



const item = {
  id: "01",
  title: "Product Title",
  desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
  imgUrl: img,
  creator: "Creator's Address",
  creatorImg: avatar,
  currentBid: 7.89,
};


const handleSubmit = (e) => {
  e.preventDefault();
  registerProduct(randomPhoto(), "IA002000128");
  //getAccountInfo();
};

const Create = () => {
  return (
    <>
      <CommonSection title="Register Item" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4">Preview Item</h5>
              <NftCard item={item} />
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__item">
                <label htmlFor="">Sell a registered item</label>
                <p className="mb-4">To sell a registered item, go to your wallet, set the price and press the sell button.</p>
                <h5>Register a new item for sale</h5>
                <form onSubmit={handleSubmit}>
                  
                  <div className="form__input">
                    <label htmlFor="">Title</label>
                    <input type="text" placeholder="Enter title" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                    ></textarea>
                  </div>

                  <div className="form__input">
                    <Row className="w-100">
                      <Col>
                        <label htmlFor="">Price</label>
                        <input
                          type="number" step="0.01"
                          placeholder="Enter price for one item (ETH)"
                        />
                      </Col>
                      <Col>
                        <label htmlFor="">Serial Number</label>
                        <input type="text" placeholder="Serial Number" />
                      </Col>
                      <Col>
                        <label for="cars">Category</label><br/>
                        <select id="cars" name="cars">
                          <option value="bag">Bag</option>
                          <option value="shoe">Shoe</option>
                          <option value="jewel">Jewel</option>
                          <option value="eyewear">Eyewear</option>
                          <option value="accessory">Accessory</option>
                          <option value="watch">Watch</option>
                        </select> 
                      </Col>
                    </Row>
                  </div>

                  <div className="form__input">
                    <Row className="w-100">
                      <Col>
                        <label htmlFor="">Material</label>
                        <input type="text" placeholder="Leather/Plastic" />
                      </Col>
                      <Col>
                        <label htmlFor="">Made In</label>
                        <input type="text" placeholder="Country" />
                      </Col>
                      <Col>
                        <label for="cars">Condition</label><br/>
                        <select id="cars" name="cars">
                          <option value="new">New, with tags</option>
                          <option value="excellent">Excellent</option>
                          <option value="good">Good, but used</option>
                          <option value="worn">Worn with love</option>
                        </select> 
                      </Col>
                    </Row>
                  </div>


                  <div className="form__input">
                    <Row className="w-100">
                      <Col>
                        <label htmlFor="">Accessories</label>
                        <input type="text" placeholder="Dust bag" />
                      </Col>
                      <Col>
                        <label htmlFor="">Weight (grams)</label>
                        <input
                          type="number" step="1"
                          placeholder="Weight"
                         />
                      </Col>
                      <Col>
                      <label htmlFor="">Year</label>
                        <input type="number" min="2000" max="2099" step="1" placeholder="2023"/>
                      </Col>
                    </Row>
                  </div>


                  <div className="form__input">
                    <label htmlFor="">Upload File <span>(not implemented)</span></label>
                    <input type="file" className="upload__input" />
                  </div>

{/*                   <div className=" d-flex align-items-center gap-4">
                    <div className="form__input w-50">
                      <label htmlFor="">Starting Date <span>(optional)</span></label>
                      <input type="date" />
                    </div>

                    <div className="form__input w-50">
                      <label htmlFor="">Expiration Date <span>(optional)</span></label>
                      <input type="date" />
                    </div>
                  </div> */}
                  <div className="d-flex justify-content-between">
                    <div><i>Now just click the button to register or list you item for sale.</i></div>
                    <div>
                      <button className="register__btn" type="submit">Register</button>
                    </div>
                  </div>

                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Create;