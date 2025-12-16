import React from 'react'

const Preloader = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className="md:grid grid-cols-3"></div>
      <div></div>
      <div className='flex justify-center items-center flex-col p-5 md:p-0'>
        <img src="https://media.baamboozle.com/uploads/images/1162839/1675879394_57767_gif-url.gif" alt="pagereload" />
      </div>
      <div></div>
    </div>
  )
}

export default Preloader