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


const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

/* Function
  Buy a product
*/
const buyProduct = async (_tokenID, _priceETH) => {
  // deposit ether on selling escrow
  let transaction = await sellingEscrow.depositEarnest(_tokenID, { value: tokens(_priceETH) })
  await transaction.wait()

  // approve the transfer of the ownership of the product
  transaction = await sellingEscrow.approveTransfer(_tokenID)
  await transaction.wait()

  // finalize sale
  //  - transfer ether to the seller
  //  - transfer the ownership to the buyer
  transaction = await sellingEscrow.finalizeSale(_tokenID)
  await transaction.wait()

  console.log('Selling Escrow balance: ', Number(await sellingEscrow.getBalance()))
  console.log('Deployer address: ', Number(await fashionToken.deployer()))
  console.log('Transfer back: ', Number(await sellingEscrow.transfer01()))
  console.log('Transfer to deployer: ', Number(await sellingEscrow.transfer02()))
  
}





// transaction fee
let fee = 0.05


const Review = ({ productName, price, productId, setShowPurchaseReview }) => {

  const confirmPurchase = () => {
    buyProduct(Number(productId), Number(price));
    setShowPurchaseReview(false);
  }

  return (
    <div className="review__wrapper">
      <div className="single__review">
        <span className="close__review">
          <i className="ri-close-line" onClick={() => setShowPurchaseReview(false)}></i>
        </span>
        <h6 className="text-center text-light">Review your purchase</h6>

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
          <p className="text-light">Price</p>
          <span className="money">{(Number(price) * (1 - Number(fee))).toFixed(2)} ETH</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p className="text-light">Service Fee</p>
          <span className="money">{(Number(price) * fee).toFixed(2)} ETH</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p className="text-light">Total Amount</p>
          <span className="money">{(Number(price)).toFixed(2)} ETH</span>
        </div>

        <button className="place__bid-btn" onClick={() => confirmPurchase()}>Confirm Purchase</button>
      </div>
    </div>
  );
};

export default Review;