import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import './nft-card-sell.css'

import Review from "../Review/ReviewSell";




const NftCard = (props) => {

  const {title, id, currentBid, creatorImg, imgUrl, creator, firstname, lastname} = props.item  ;
  const [showReview, setShowReview] = useState(false);
  const [productName, setProductName] = useState('Product Title');
  const [price, setPrice] = useState(1);
  const [productId, setProductId] = useState(1);

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
        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={creatorImg} alt="" className='w-100' />
          </div>

          <div className='owner__info w-70'>
            <h6>{firstname}</h6>
            <p>{lastname}</p>
          </div>
        </div>

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
            <button className="bid__btn d-flex align-items-center gap-2" onClick={() => ReviewSell()}>Sell</button>
          </div>
        </div>

        <div className="creator__info d-flex align-items-center justify-content-between">
          <div className='w-150'>
            <h6>Original Owner's Address</h6>
          </div>
        </div>
      </div>

      <div className="creator__info d-flex align-items-center justify-content-between">
        <p className='original__address'>{creator}</p>
        <button className='copy__to__clipboard'>
          <i className="ri-file-copy-line"></i>
        </button>

        {showReview && <Review productName={productName} productId={productId} price={price} setShowReview={setShowReview} />}

      </div>

      <span><Link to='#' className='history__link'><i className="ri-history-line"></i> View Ownership History</Link></span>
    </div>
  )
}

export default NftCard