import React, {useState} from 'react'
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import CommonSection from "../components/ui/Common-section/CommonSection";
import LiveAuction from "../components/ui/Live-auction/LiveAuction";
import { NFT__DATA } from "../assets_test/data/data";
import Review from '../components/ui/Review/Review';


import "../styles/nft-details.css";

const NftDetails = () => {
  const { id } = useParams();

  const [showReview, setShowReview] = useState(false);
  const [productName, setProductName] = useState('Product Title');
  const [price, setPrice] = useState(1);

  /**Show Reviwew */
  const reviewPurchase = () => {
    setShowReview(true)
    // name
    if (singleNft.title != '') {
      setProductName(singleNft.title)
    }
    // price
    if (singleNft.currentBid != 0) {
      setPrice(singleNft.currentBid)
    }
  }

  const singleNft = NFT__DATA.find((item) => item.id === id);

  return (
    <>
      <CommonSection title={singleNft.title} />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <img
                src={singleNft.imgUrl}
                alt=""
                className="w-100 single__nft-img"
              />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>{singleNft.title}</h2>

                <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
                  <div className=" d-flex align-items-center gap-4 single__nft-seen">
                    <span>
                      <i className="ri-eye-line"></i> 234
                    </span>
                    <span>
                      <i className="ri-heart-line"></i> 123
                    </span>
                  </div>

                  <div className=" d-flex align-items-center gap-2 single__nft-more">
                    <span>
                      <i className="ri-send-plane-line"></i>
                    </span>
                    <span>
                      <i className="ri-more-2-line"></i>
                    </span>
                  </div>
                </div>

                <div className="nft__creator d-flex gap-3 align-items-center">
                  <div className="creator__img">
                    <img src={singleNft.creatorImg} alt="" className="w-100" />
                  </div>

                  <div className="creator__detail">
                    <p>Seller - Current Owner</p>
                    <h6>{singleNft.creator}</h6>
                    <p>Created By</p>
                    <h6>{singleNft.creator}</h6>
                  </div>
                </div>

                <p className="my-4">{singleNft.description}</p>

                <p>Price: {Number(singleNft.currentBid).toFixed(2)} ETH</p>

                <button className="singleNft-btn d-flex align-items-center gap-2" onClick={() => reviewPurchase()}>
                  <i className="ri-shopping-bag-line"></i>
                  <span className='purchase__label'>Purchase Item</span>
                </button>

                {showReview && <Review productName={productName} price={price} setShowReview={setShowReview} />}

              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <LiveAuction />
    </>
  );
};

export default NftDetails;