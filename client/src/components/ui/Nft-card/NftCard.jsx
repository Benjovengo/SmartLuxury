import React from 'react'
import { Link } from 'react-router-dom'


import img01 from '../../../assets_test/images/img-01.jpg'
import ava01 from '../../../assets_test/images/ava-01.png'


const NftCard = () => {

  //const {title, id, currentBid, creatorImg, imgUrl, creator} = props.item  

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={img01} alt="" className='w-100' />
      </div>

      <div className="nft__content">
        <h5 className='nft__title'><Link to='/market'>Bolsa Chanel</Link></h5>
        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={ava01} alt="" className='w-100' />
          </div>

          <div className='owner__info w-70'>
            <h6>Current owner</h6>
            <p>Sarah Connor</p>
          </div>
        </div>

        <div className="price__info d-flex align-items-center justify-content-between">
          <div className='w-50'>
            <h6>Price</h6>
            <p>R$3.000,00</p>
          </div>
          <div className='d-flex align-items-center justify-content-between'>
            <button className="bid__btn d-flex align-items-center gap-2">Buy</button>
          </div>
        </div>

        <div className="creator__info d-flex align-items-center justify-content-between">
          <div className='w-50'>
            <h6>Original Owner</h6>
            <p>Chanel</p>
            <span><Link to='#' className='history__link'>View History</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NftCard