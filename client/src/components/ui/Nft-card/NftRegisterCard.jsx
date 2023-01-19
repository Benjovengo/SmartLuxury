import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import './nft-card.css'

import Review from "../Review/Review";

function copyToClipboard(_Address) {
  //console.log('')
}

const NftCard = (props) => {

  const {title, id, currentBid, creatorImg, imgUrl, creator} = props.item  

  const [showReview, setShowReview] = useState(false);

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={imgUrl} alt="" className='w-100' />
      </div>

      <div className="nft__content">
        <h5 className='nft__title'>{title}</h5>
        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={creatorImg} alt="" className='w-100' />
          </div>

          <div className='owner__info w-70'>
            <h6>Seller</h6>
            <p>Sarah Connor</p>
          </div>
        </div>

        <div className="price__info d-flex align-items-center justify-content-between">
          <div className='w-50'>
            <h6>Price</h6>
            <p>{currentBid} ETH</p>
          </div>
          <div className='d-flex align-items-center justify-content-between'>
            <button className="bid__btn d-flex align-items-center gap-2">Buy</button>
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
          <button className='copy__to__clipboard' onClick={copyToClipboard('Address')}>
            <i className="ri-file-copy-line"></i>
          </button>

          {showReview && <Review setShowReview={setShowReview} />}

      </div>

      <span><Link to='#' className='history__link'><i className="ri-history-line"></i> View Ownership History</Link></span>
    </div>
  )
}

export default NftCard