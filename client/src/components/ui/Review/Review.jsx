import React from "react";

import "./review.css";

const Review = ({ setShowReview }) => {
  return (
    <div className="review__wrapper">
      <div className="single__review">
        <span className="close__review">
          <i className="ri-close-line" onClick={() => setShowReview(false)}></i>
        </span>
        <h6 className="text-center text-light">Review your purchase</h6>

        <p className="text-light">
          Item
        </p>
        <p className="money">ITEM NAME</p>

        <p className="text-light">
          Seller's address
        </p>
        <p className="money">0xC74a9a98Af6108adD8EB17A4262d3dc9B924c429</p>

        <div className="input__item mb-3">
          <p className="text-light">Quantity</p>
          <input type="number" placeholder="Enter quantity" />
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p className="text-light">Price</p>
          <span className="money">5.89 ETH</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p className="text-light">Service Fee</p>
          <span className="money">0.89 ETH</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p className="text-light">Total Amount</p>
          <span className="money">5.89 ETH</span>
        </div>

        <button className="place__bid-btn">Place a Bid</button>
      </div>
    </div>
  );
};

export default Review;