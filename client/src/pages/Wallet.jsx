import React, { useState, useEffect } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "../styles/wallet.css";

import NftCard from "../components/ui/Nft-card/NftWallet";
import { PRODUCTS__OWNED__FILE, accountData } from '../scripts/accountNFT'



const wallet__data = [
  {
    title: "Bitcoin",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium accusamus repellat rerum consequatur explicabo? Reiciendis!",
    icon: "ri-bit-coin-line",
    urlLink: "https://bitcoin.org/",
  },

  {
    title: "Coinbase",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium accusamus repellat rerum consequatur explicabo? Reiciendis!",
    icon: "ri-coin-line",
    urlLink: "https://www.coinbase.com/",
  },

  {
    title: "Metamask",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium accusamus repellat rerum consequatur explicabo? Reiciendis!",
    icon: "ri-money-cny-circle-line",
    urlLink: "https://metamask.io/",
  },

  {
    title: "Authereum",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium accusamus repellat rerum consequatur explicabo? Reiciendis!",
    icon: "ri-bit-coin-line",
    urlLink: "https://authereum.com/",
  },
];

const Wallet = () => {

  let PRODUCTS__OWNED = PRODUCTS__OWNED__FILE

  const reloadData = async () => {
    //console.log('Wallet main page')
    //console.log(await accountData())
  }

  useEffect(() => {
    reloadData();
  }, [])




  return (
    <>
      <CommonSection title="Manage Collection" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <div className="w-50 m-auto">
                <h3 className="">Your Collection</h3>
                <p>
                  Manage you collection of luxury items!
                </p>
              </div>
            </Col>

            <Row>
                {
                  PRODUCTS__OWNED.slice(0, 8).map((item) => (
                    <Col lg="3" md="4" sm="6" key={item.id} className="mb-4">
                      <NftCard item={item} />
                    </Col>
                  ))
                }
            
            </Row>
            
            <Row className="mt-5">
              {wallet__data.map((item, index) => (
              <Col lg="3" md="4" sm="6" key={index} className="mb-4">
                <a className="wallet__links" href={item.urlLink} target="_blank">
                  <div className="wallet__item">
                    <span>
                      <i className={item.icon}></i>
                    </span>
                    <h5>{item.title}</h5>
                    <p className="text-light">{item.desc}</p>
                  </div>
                </a>
              </Col>
              ))}
            </Row>
            
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Wallet;