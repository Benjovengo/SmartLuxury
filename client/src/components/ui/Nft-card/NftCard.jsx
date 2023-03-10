import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import './nft-card.css'

import Review from "../Review/Review";
import { getOwnersList } from '../../../scripts/ownersList';


function copyToClipboard(_Address) {
  //console.log('')
}

const NftCard = (props) => {

  const {title, id, currentBid, creatorImg, imgUrl, creator, firstname, lastname} = props.item  

  const [showPurchaseReview, setShowPurchaseReview] = useState(false);
  const [productName, setProductName] = useState('Product Title');
  const [productId, setProductId] = useState(1);
  const [price, setPrice] = useState(1);


  /** Get list of owners for a product */
  const ownersList = async (_nftID) => {
    const list = await getOwnersList(_nftID)
    alert('First owner: ' + list[0])
  }


  /**Show Reviwew */
  const reviewSell = () => {
    setShowPurchaseReview(true)
    // name
    if (title !== '') {
      setProductName(title)
    }
    // id
    if (id > 0) {
      setProductId(id)
    }
    // price
    if (currentBid !== 0) {
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
        <div className='product__stars'>
          <i className="ri-star-line"></i><i className="ri-star-half-line"></i><i className="ri-star-fill"></i>
        </div>
        <div className='owner__info w-70'>
          <p><span>Seller:</span> {firstname} {lastname}</p>
        </div>

        <div className="price__info d-flex align-items-center justify-content-between">
          <div className='w-70'>
            <p>Price: <span>{(Number(currentBid)).toFixed(2)} ETH</span></p>
          </div>
          <div className='d-flex align-items-center justify-content-between'>
            <button className="buy__btn d-flex align-items-center gap-2" onClick={() => reviewSell()}>Buy</button>
          </div>
        </div>

        <div className="creator__info">
          <h6>Original Owner's Address</h6>
        </div>
      </div>

      <div className="creator__address d-flex align-items-center justify-content-between">
          <p className='original__address'>{creator}</p>
          <button className='history__link tooltip-toggle' data-tooltip="View ownership history" onClick={() => ownersList(id)}>
            <i className="ri-history-line"></i>
          </button>

          {showPurchaseReview && <Review productName={productName} price={price} productId={productId} setShowPurchaseReview={setShowPurchaseReview} />}

      </div>

    </div>
  )
}

export default NftCard