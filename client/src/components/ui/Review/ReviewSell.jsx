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





// Default Fee
let fee = 0.05

const Review = ({ productName, productId, price, setShowReview }) => {

  /* Function
    List product for sale
  */
  const listProduct = async () => {
    console.log(productId)
/*     let transaction = await fashionToken.approve(sellingEscrow.address, productId)
    await transaction.wait()
    // List product
    const totalPrice = (Number(price) + Number(fee))*100
    transaction = await sellingEscrow.list(productId, totalPrice)
    await transaction.wait() */
    console.log('Product Listed!')
  }


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
        <p className="money">{productName}</p>

        <p className="text-light">
          Seller's address
        </p>
        <p className="money">0xC74a9a98Af6108adD8EB17A4262d3dc9B924c429</p>

        <div className="input__item mb-3">
          <p className="text-light">Quantity</p>
          <input type="number" placeholder="Enter quantity" defaultValue={1} />
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p className="text-light">Value to be received after tax</p>
          <span className="money">{price} ETH</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p className="text-light">Service fee</p>
          <span className="money">{fee} ETH</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p className="text-light">Total Price</p>
          <span className="money">{Number(price) + Number(fee)} ETH</span>
        </div>

        {/* <i className="ri-close-line" onClick={() => console.log('Another BUTTON')}></i> */}

        <button onClick={() => listProduct()} className="place__bid-btn">Confirm</button>
      </div>
    </div>
  );
};

export default Review;