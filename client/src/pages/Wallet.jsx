import React, { useEffect, useState, useLayoutEffect } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "../styles/wallet.css";

import NftCard from "../components/ui/Nft-card/NftWallet";
import { PRODUCTS__OWNED__FILE, accountData } from '../scripts/accountNFT'



const wallet__data = [
  {
    title: "Bitcoin",
    desc: "Experience the future of money with Bitcoin: decentralized, secure, and global digital currency.",
    icon: "ri-bit-coin-line",
    urlLink: "https://bitcoin.org/",
  },

  {
    title: "Coinbase",
    desc: "Coinbase is the easiest place to buy and sell cryptocurrency. Sign up and get started today.",
    icon: "ri-coin-line",
    urlLink: "https://www.coinbase.com/",
  },

  {
    title: "Metamask",
    desc: "Experience seamless blockchain transactions with Metamask, your secure and user-friendly digital wallet.",
    icon: "ri-money-cny-circle-line",
    urlLink: "https://metamask.io/",
  },

  {
    title: "Authereum",
    desc: "Experience seamless, secure and decentralized Ethereum transactions with Authereum Wallet.",
    icon: "ri-bit-coin-line",
    urlLink: "https://authereum.com/",
  },
];

const Wallet = () => {

// @notice scroll to the top of the page
useLayoutEffect(() => {
  window.scrollTo(0, 0)
});

// Hooks
const [data, setData] = useState(PRODUCTS__OWNED__FILE);


// ====== UPDATE PRODUCTS ON LOAD =========
const updateProducts = async () => {
  setData(await accountData());
}

useEffect(() => {
  updateProducts();
}, [])


  return (
    <>
      <CommonSection title="Collection" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <div className="w-50 m-auto">
                <h3 className="collection__header">Manage Your Collection</h3>
              </div>
            </Col>

            <Row>
                {
                  data.map((item) => (
                    <Col lg="3" md="4" sm="6" key={item.id} className="mb-4">
                      <NftCard item={item} />
                    </Col>
                  ))
                }
            
            </Row>
            
            <Row className="crypto__links mt-5">
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