import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import './nft-card.css'

import Review from "../Review/Review";

function copyToClipboard(_Address) {
  //console.log('')
}

const NftCard = (props) => {

  const {title, id, currentBid, creatorImg, imgUrl, creator, firstname, lastname} = props.item  

  const [showPurchaseReview, setShowPurchaseReview] = useState(false);
  const [productName, setProductName] = useState('Product Title');
  const [productId, setProductId] = useState(1);
  const [price, setPrice] = useState(1);

  /**Show Reviwew */
  const reviewSell = () => {
    setShowPurchaseReview(true)
    // name
    if (title != '') {
      setProductName(title)
    }
    // id
    if (id > 0) {
      setProductId(id)
    }
    // price
    if (currentBid != 0) {
      setPrice(currentBid)
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
        <h5 className='nft__title'>
          <Link to={`/market/${id}`}>{title}</Link>
        </h5>
        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={creatorImg} alt="" className='w-100' />
          </div>

          <div className='owner__info w-70'>
            <h6>Seller</h6>
            <h5>{firstname}</h5>
            <p>{lastname}</p>
          </div>
        </div>

        <div className="price__info d-flex align-items-center justify-content-between">
          <div className='w-50'>
            <h6>Price</h6>
            <p>{(Number(currentBid)).toFixed(2)} ETH</p>
          </div>
          <div className='d-flex align-items-center justify-content-between'>
            <button className="bid__btn d-flex align-items-center gap-2" onClick={() => reviewSell()}>Buy</button>
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

          {showPurchaseReview && <Review productName={productName} price={price} productId={productId} setShowPurchaseReview={setShowPurchaseReview} />}

      </div>

      <span><Link to='#' className='history__link'><i className="ri-history-line"></i> View Ownership History</Link></span>
    </div>
  )
}

export default NftCard