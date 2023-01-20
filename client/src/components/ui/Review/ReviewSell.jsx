import React from "react";
import { ethers } from 'ethers';


import "./review.css";

// Import ABI
import FashionToken from '../../../abis/FashionToken.json'
import SellingEscrow from '../../../abis/SellingEscrow.json'
import config from '../../../config.json'; // config

/** SETUP ETHERS CONNECTION */
// Setup provider and network
let provider = new ethers.providers.Web3Provider(window.ethereum)
const network = await provider.getNetwork()
// get signer
const signer = provider.getSigner();
// Javascript "version" of the smart contracts
const fashionToken = new ethers.Contract(config[network.chainId].fashionToken.address, FashionToken, signer)
const sellingEscrow = new ethers.Contract(config[network.chainId].sellingEscrow.address, SellingEscrow, signer)


/* Function
  List product for sale
*/
const listProduct = async () => {
  let transaction = await fashionToken.approve(sellingEscrow.address, 4)
  await transaction.wait()
  // List product
  transaction = await sellingEscrow.list(4, 85)
  await transaction.wait()
  console.log('Product Listed!')
}


// Default Fee
let fee = 0.05

const Review = ({ price, setShowReview }) => {
  return (
    <div className="review__wrapper">
      <div className="single__review">
        <span className="close__review">
          <i className="ri-close-line" onClick={() => setShowReview(false)}></i>
        </span>
        <h6 className="text-center text-light">Review your item to sell</h6>

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
          <input type="number" placeholder="Enter quantity" defaultValue={1} />
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p className="text-light">Price</p>
          <span className="money">{price} ETH</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p className="text-light">Service Fee</p>
          <span className="money">{fee} ETH</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p className="text-light">Total Amount</p>
          <span className="money">5.89 ETH</span>
        </div>

        {/* <i className="ri-close-line" onClick={() => console.log('Another BUTTON')}></i> */}

        <button onClick={() => listProduct()} className="place__bid-btn">Confirm</button>
      </div>
    </div>
  );
};

export default Review;