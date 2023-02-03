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
        <Link to={`/market/${id}`}>
          <img src={imgUrl} alt="" className='w-100' />
        </Link>
      </div>

      <div className="nft__content">
        <h5 className='nft__title'>
          <Link to="#">{title}</Link>
        </h5>
        <div className='owner__info w-70'>
          <p><span>Seller:</span> Sarah Connor</p>
        </div>
        <div className='product__stars'>
        <i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-half-line"></i><i className="ri-star-line"></i>
        </div>

        <div className="price__info d-flex align-items-center justify-content-between">
          <div className='w-70'>
            <p>Price: <span>{(Number(currentBid)).toFixed(2)} ETH</span></p>
          </div>
          <div className='d-flex align-items-center justify-content-between'>
            <button className="buy__btn d-flex align-items-center gap-2">Buy</button>
          </div>
        </div>

        <div className="creator__info">
          <h6>Original Owner's Address</h6>
        </div>
      </div>

      <div className="creator__address d-flex align-items-center justify-content-between">
          <p className='original__address'>{creator}</p>
          <button className='history__link tooltip-toggle' data-tooltip="View ownership history">
            <i className="ri-history-line"></i>
          </button>
      </div>

    </div>
  )
}

export default NftCard