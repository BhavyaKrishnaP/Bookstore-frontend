import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const PaySuccess = () => {
  return (
    <>
    <Header/>
    <div className='grid grid-cols-2 p-10 mt-10'>
    <div className='m-10 px-10 py-10'>
        <h2 className='text-2xl font-bold text-blue-600'>Congratulations...</h2>
        <p className='mt-4 text-lg font-medium'>Thank You for shopping with Bookstore..</p>
        <Link to={'/all-books'}>
        <button className='mt-6 bg-blue-800 text-white p-2 text-sm rounded cursor-pointer'><FontAwesomeIcon icon={faBackward} className='me-2'/>Explore More Books
        </button>
        </Link>
    </div>
    <div>
        <img src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif" alt="payment-success" style={{width:"80%",height:"80%"}}/>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default PaySuccess