import React from 'react'
import { Link } from 'react-router-dom'

const NftCard = (props) => {

  const {title, id, currentBid, creatorImg, imgUrl, creator} = props.item

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={imgUrl} alt="" className='w-100' />
      </div>
      <div className="nft__content">
        <h5 className='nft__title'><Link to='/market/${id}'>{title}</Link></h5>
        
        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={creatorImg} alt="" className='w-100' />
          </div>

            <div className='owner__info w-70'>
              <h6>Current owner</h6>
              <p>Sarah Connor</p>
            </div>
            <div className='owner__info w-70'>
              <h6>Price</h6>
              <p>{currentBid}</p>
            </div>
            
          </div>

        </div>
        <div className="creator__info d-flex align-items-center justify-content-between">
          <div className='w-50'>
            <h6>Original Owner</h6>
            <p>{creator}</p>
            <span><Link to='#' className='history__link'>View History</Link></span>
          </div>
          <div className='d-flex align-items-center justify-content-between'>
            <button className="bid__btn d-flex align-items-center gap-2">Buy</button>
          </div>
      </div>
    </div>
  )
}

export default NftCard