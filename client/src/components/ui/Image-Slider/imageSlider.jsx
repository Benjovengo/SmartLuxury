import React from 'react'
import PropTypes from 'prop-types'
import 'swiper/swiper.min.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'

import './imageSlider.scss'

const ImageSlider = props => {
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        /* thumbs={{ swiper: activeThumb }} */
        className='product__images__slider'
      >
        {
          props.images.map((item, index) => (
            <SwiperSlide key={index}>
                <img src={item} alt="product images" />
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