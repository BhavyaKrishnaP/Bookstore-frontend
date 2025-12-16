import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons'

const Contact = () => {
  return (
    <>
      <Header />
      <div className='flex justify-center items-center flex-col md:px-20 p-8'>
        <h1 className='text-2xl font-semibold'>Contacts</h1>

        <p className='mt-8'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus ipsa corporis, culpa distinctio veniam iste, sequi reiciendis asperiores, similique alias perspiciatis. Error deleniti eaque commodi! Nam earum voluptatibus tempore facilis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe amet, repellendus autem ducimus nemo eius qui ad accusantium deserunt sit similique ullam beatae veniam, optio maiores, explicabo animi? Cumque, minus.</p>

      </div>
      <div className='flex flex-wrap px-4 justify-around mb-10'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-full bg-gray-300 flex justify-center items-center'>
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          <p>123 Main Street, Apt 4B, <br /> Anytown, CA 91234</p>
        </div>

        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-full bg-gray-300 flex justify-center items-center'>
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <p>+91 9010201148</p>
        </div>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-full bg-gray-300 flex justify-center items-center'>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <p>Bookstore@gmailcom</p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 px-20 my-7 max-w-7xl gap-10 mx-auto'>
        <div className='bg-gray-300 px-10 py-7 max-w-4xl rounded'>
          <h2 className='text-center mb-4'>Send me Message</h2>
          <form className='space-y-3'>
            <input type="text" placeholder='Name' className='w-full p-3 rounded bg-white' />
            <input type="email" placeholder='Email Id' className='w-full p-3 rounded bg-white' />
            <textarea placeholder='Message' rows='5' className='w-full p-3 rounded bg-white'></textarea>
            <button className='bg-gray-900 text-white w-full p-3 '>Send<FontAwesomeIcon icon={faPaperPlane} className='px-2' /></button>
          </form>
        </div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62865.55832720454!2d76.30948095113635!3d10.008813464705796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c8e94a07a07%3A0x49921cdfae82660!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1762276834288!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <Footer />
    </>
  )
}

export default Contact