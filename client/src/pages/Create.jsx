import React from "react";

import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftSellCard";
import img from "../assets/images/img-01.png";
import avatar from "../assets/images/ava-01.png";
import { randomPhoto } from "../scripts/randomProduct";

import "../styles/create-item.css";

import { registerProduct, createJSON } from "../scripts/addProduct";



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
  let productName = e.target.productName.value;
  let productBrand = e.target.brand.value;
  let productDescription = e.target.descript.value;
  let productSN = e.target.serialNumber.value;
  let productCategory = e.target.category.value;
  let productMaterial = e.target.material.value;
  let productMadeIn = e.target.madeIn.value;
  let productCondition = e.target.condition.value;
  let productAccessories = e.target.accessories.value;
  let productWeight = e.target.weight.value;
  let productYear = e.target.year.value;

  let jsonData = createJSON(productName, productBrand, productDescription, randomPhoto(), 11, productSN, productCategory, productCondition, productMaterial, productAccessories, productWeight, productMadeIn, productYear)
  console.log('Create: (json data below)')
  console.log(jsonData)
  registerProduct('https://github.com/Benjovengo/SmartLuxury/raw/master/client/public/metadata/Gucci-Swing-Red_IA002000868.json', "IA002000143");
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
                <label>Sell a registered item</label>
                <p className="mb-4">To sell a registered item, go to your wallet, set the price and press the sell button.</p>
                <h5>Register a new item for sale</h5>
                <form onSubmit={handleSubmit}>
                  
                  <div className="form__input">
                    <label>Title</label>
                    <input type="text" name="productName" placeholder="Enter title" />
                  </div>

                  <div className="form__input">
                    <label>Description</label>
                    <textarea
                      name="descript"
                      id=""
                      rows="5"
                      placeholder="Enter description"
                      className="w-100"
                    ></textarea>
                  </div>

                  <div className="form__input">
                    <Row className="w-100">
                      <Col>
                        <label>Brand</label>
                        <input
                          type="text" name="brand"
                          placeholder="Brand"
                        />
                      </Col>
                      <Col>
                        <label>Serial Number</label>
                        <input type="text" name="serialNumber" placeholder="Serial Number" />
                      </Col>
                      <Col>
                        <label htmlFor="category">Category</label><br/>
                        <select id="category" name="category">
                          <option value="bag">Bag</option>
                          <option value="shoe">Shoe</option>
                          <option value="jewel">Jewelry</option>
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
                        <label>Material</label>
                        <input type="text" name="material" placeholder="Leather/Plastic" />
                      </Col>
                      <Col>
                        <label>Made In</label>
                        <input type="text" name="madeIn" placeholder="Country" />
                      </Col>
                      <Col>
                        <label htmlFor="condition">Condition</label><br/>
                        <select id="condition" name="condition">
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
                        <input type="text" name="accessories" placeholder="Dust bag" />
                      </Col>
                      <Col>
                        <label htmlFor="">Weight (grams)</label>
                        <input
                          type="number" step="1"
                          name="weight"
                          placeholder="Weight"
                         />
                      </Col>
                      <Col>
                      <label htmlFor="">Year</label>
                        <input type="number" min="2000" max="2099" step="1" name="year" placeholder="2023"/>
                      </Col>
                    </Row>
                  </div>


                  <div className="form__input">
                    <label htmlFor="">Upload File <span>(not implemented)</span></label>
                    <input type="file" className="upload__input" />
                  </div>

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