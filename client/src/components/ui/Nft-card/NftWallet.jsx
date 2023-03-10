import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { ethers } from 'ethers';

import './nft-card-wallet.css'

import Review from "../Review/ReviewSell";
import { getOwnersList } from '../../../scripts/ownersList';

// Import ABI
import SellingContract from '../../../abis/SellingContract.json' // import Selling contract ABI
import config from '../../../config.json'; // config

/** SETUP ETHERS CONNECTION */
// Setup provider and network
let provider = new ethers.providers.Web3Provider(window.ethereum)
const network = await provider.getNetwork()
// get signer
const signer = provider.getSigner();
// Javascript "version" of the smart contracts
const sellingContract = new ethers.Contract(config[network.chainId].sellingContract.address, SellingContract, signer)

//**Remove item from selling list */
const stopSelling = async (_tokenID) => {
  let transaction = await sellingContract.approveTransfer(_tokenID)
  await transaction.wait()
  transaction = await sellingContract.unlist(_tokenID)
  await transaction.wait()
  console.log('Item removed from selling list.')
}



const NftCard = (props) => {

  const {title, id, currentBid, creatorImg, imgUrl, creator, firstname, lastname, isListed} = props.item  ;
  const [showReview, setShowReview] = useState(false);
  const [productName, setProductName] = useState('Product Title');
  const [price, setPrice] = useState(1);
  const [productId, setProductId] = useState(1);

  /** Get list of owners for a product */
  const ownersList = async (_nftID) => {
    const list = await getOwnersList(_nftID)
    alert('First owner: ' + list[0])
  }

  /**Show Reviwew */
  const ReviewSell = () => {
    setShowReview(true)
    // name
    if (title !== '') {
      setProductName(title)
    }
    // ID
    if (id !== '') {
      setProductId(id)
    }
    // price
    let inputID = `priceInput${id}`
    let priceResult = document.getElementById(inputID).value
    if (priceResult !== '') {
      setPrice(priceResult)
    }
  }



  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <Link to={`/market/${id}`}>
          <img src={imgUrl} alt="" className='w-100' />
        </Link>
      </div>

      <div className="nft__content">
        <h5 className='nft__title' >
          <Link to={`/market/${id}`}>{title}</Link>
        </h5>
        <div className="nft__stars">
          <i className="ri-star-line"></i><i className="ri-star-half-line"></i><i className="ri-star-fill"></i>
        </div>
        <div className="creator__info-wrapper d-flex gap-3">

          <div className='owner__info w-70'>
            {(firstname) || (lastname) ? <p>{firstname}<br/><span>{lastname}</span></p> : <p>Sarah<br/><span>Connor</span></p> }
          </div>
        </div>

        { (!isListed) ?
          <>
            <h6 className='price__header'>Set price</h6>
            <div className="price__info d-flex align-items-bottom justify-content-between">
              <div className='w-50'>
                <div className="price__input">
                  <input
                    type="number" step="0.01"
                    placeholder="Price (ETH)"
                  id={`priceInput${id}`}
                  />
              </div>
              </div>
              <div className='d-flex align-items-center justify-content-between'>
                <button className="buy__btn d-flex align-items-center gap-2" onClick={() => ReviewSell()}>Sell</button>
              </div>
            </div>
          </> :
          <>
            <h6 className='price__header'>Changed your mind?</h6>
            <div className='d-flex align-items-center justify-content-between'>
              <button className="buy__btn" onClick={() => stopSelling(id)}>Remove from sale</button>
            </div>
          </>
        }
        

        <div className="creator__info d-flex align-items-center justify-content-between">
          <div className='w-150'>
            <h6>Original Owner's Address</h6>
          </div>
        </div>
      </div>

      <div className="creator__info d-flex align-items-center justify-content-between">
        <p className='original__address'>{creator}</p>
        <button className='history__link tooltip-toggle' data-tooltip="View ownership history" onClick={() => ownersList(id)}>
          <i className="ri-history-line"></i>
        </button>

        {showReview && <Review productName={productName} productId={productId} price={price} setShowReview={setShowReview} />}

      </div>
    </div>
  )
}

export default NftCard