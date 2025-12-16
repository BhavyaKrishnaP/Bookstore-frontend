import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'

import React from 'react'

const Footer = () => {
  return (
    <>
      <div className='bg-gray-900 text-white'>
        <div className="max-w-full mx-auto px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className='px-10'>
            <h3 className='font-semibold text-lg mb-4'>ABOUT US</h3>
            <p className='text-sm leading-relaxed text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In ducimus, aspernatur dolor assumenda cum ex obcaecati culpa enim illum ut nihil doloribus repellat rem deserunt facere ipsa maiores est itaque.</p>
          </div>
          <div className='px-10'>
            <h3 className='font-semibold text-lg mb-4'>NEWS LETTER</h3>
            <p className='text-sm mb-3'>Stay updated with our latest trends</p>
            <div className="flex flex-wrap">
              <input type="email" placeholder='Email ID' className='bg-white text-black font-semibold p-1' />
              <button className='bg-yellow-400 text-black px-2 py-1'><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
          </div>
          <div className='px-10'>
            <h3 className='font-semibold text-lg mb-4'>FOLLOW US</h3>
            <p className='text-sm mb-3'>Let us be social</p>
            <div className='flex gap-3 text-lg'>
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faXTwitter} />
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faLinkedin} />
            </div>
          </div>
          <div></div>
        </div>
          <div className='w-full text-center bg-black py-2 px-2 text-white '>
            Copyright &#169; 2025 All rights reserved | This website is made with by 💛 BookStore
          </div>
      </div>
        
    </>
  )
}

export default Footer