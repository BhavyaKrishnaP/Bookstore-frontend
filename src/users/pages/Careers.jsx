import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons'

const Careers = () => {
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    return (
        <>
            <Header />
            <div className='flex justify-center items-center flex-col md:px-20 p-4'>
                <h1 className='text-2xl'>Careers</h1>
                <p className='mt-8 mb-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor sequi esse tenetur sapiente fuga amet error voluptas quos molestiae, in excepturi vitae vel est quo atque ut deserunt. Natus, architecto.</p>
            </div>
            <div className='px-15'>
                <h1 className='text-xl font-medium'>Current Openings</h1>
                <div className='flex justify-center items-center  md:px-12 sm:p-3 sm:flex-row flex-col gap-1'>
                    <input type="text" placeholder='Search By Title' className='border border-gray-400 shadow-lg shadow-gray-400 w-72 px-3 py-2 rounded' />
                    <button className='bg-green-800 px-3 py-2 ms-2 text-white hover:bg-white hover:border hover:border-green-800 hover:text-green-800'>Search</button>
                </div>
            </div>
            {/* career cards */}
            <div className='w-full max-w-6xl mx-auto border border-gray-400 shadow-xl rounded p-5 my-5'>
                <h2>IT Head</h2>
                <hr style={{ width: '90%' }} className='my-2' />
                <button onClick={openModal} className='bg-green-800 text-white px-3 py-3 hover:bg-white hover:border hover:border-green-800 hover:text-green-800 rounded flex ms-auto' style={{ marginTop: '-30px' }}>Apply<FontAwesomeIcon icon={faArrowUpRightFromSquare} className='ms-2 mt-1' />
                </button>
                <div className='flex items-center gap-3 mt-4 mb-2'> <FontAwesomeIcon icon={faLocationDot} className='text-blue-600' /><span>Alapuzha</span></div>
                <div className='mb-4'>
                    <p className='mb-2'>Job Type : Full time</p>
                    <p className='mb-2'>Salary : 20000</p>
                    <p className='mb-2'>Qualification : Any Degree</p> <p className='mb-2'>Experience : 2 Years</p>
                    <p className='mb-2'>Description : IT Head....</p>
                </div>
            </div>

            {/* Modal */}
            {isOpen && (<div className='fixed inset-0 flex justify-center items-center  bg-gray-500/75 transition-opacity' aria-hidden='true'>
                <div className='bg-white w-full max-w-xl shadow-lg rounded-lg'>
                    <div className='bg-gray-900 text-white flex justify-between items-center px-3 py-4'>
                        <h2 className='text-2xl'>Application Form</h2>
                        <button onClick={closeModal}><FontAwesomeIcon icon={faXmark} className='text-3xl' /></button>
                    </div>
                    <div className='p-10'>
                        <form className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <input type="text" placeholder='Full Name' className='border rounded px-3 py-2 border-gray-400' />
                            <input type="text" placeholder='Qualification' className='border rounded px-3 py-2 border-gray-400' />
                            <input type="text" placeholder='Email ID' className='border rounded px-3 py-2 border-gray-400' />
                            <input type="text" placeholder='Phone' className='border rounded px-3 py-2 border-gray-400' />
                            <textarea placeholder='Cover Letter' rows="2" className='border border-gray-400 px-3 py-2 rounded col-span-1 sm:col-span-2'></textarea>
                            <div className='col-span-1 sm:col-span-2'>
                                <label className='text-gray-400 mb-2 block text-lg'>Resume</label>
                                <input type="file" className='w-full border border-gray-400 rounded file:bg-gray-400 file:px-3 file:py-2 file:text-white cursor-pointer file:cursor-pointer' />
                            </div>
                        </form>
                    </div>
                    <div className='w-full bg-gray-200 px-4 py-4 text-white text-sm font-semibold flex justify-end items-center gap-3'>
                        <button className='bg-orange-500 rounded px-3 py-2'>Reset</button>
                        <button className='bg-green-700 rounded px-3 py-2'>Submit</button>
                    </div>
                </div>
            </div>)}
            <Footer />
        </>
    )
}

export default Careers