import React, { useState } from 'react'
import PropTypes from 'prop-types'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'

import './imageSlider.scss'

const ImageSlider = props => {
  const [activeThumb, setActiveThumb] = useState(null);

  return (
    <>
      <Swiper
        loop={false}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null}}
        className='product__images__slider'
      >
        {
          props.images.map((item, index) => (
            <SwiperSlide key={index}>
                <div className='img__container'>
                  <img src={item} alt="product images" />
                </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Swiper
        loop={false}
        spaceBetween={10}
        slidesPerView={Math.min(props.images.length,4)}
        modules={[Navigation, Thumbs]}
        watchSlidesProgress
        onSwiper={setActiveThumb}
        className='product__thumbs__slider'
      >
        {
          props.images.map((item, index) => (
            <SwiperSlide key={index}>
                <div className="product__thumbs__slider__wrapper">
                    <img src={item} alt="product images" />
                </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  )
}

ImageSlider.propTypes = {
  images: PropTypes.array.isRequired
}

export default ImageSlider