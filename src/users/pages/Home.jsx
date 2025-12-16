import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { getHomeBooksAPI } from '../../services/allAPIs'
import { searchKeyContext } from '../../context/Contextshare'
import { toast, ToastContainer } from 'react-toastify'


const Home = () => {

  const [homeBook, setHomeBook] = useState([])
  const { searchKey, setSearchkey } = useContext(searchKeyContext)
  const navigate = useNavigate()

  const getHomeBooks = async () => {
    const result = await getHomeBooksAPI()
    console.log(result.data);
    if (result.status == 200) {
      setHomeBook(result.data)
    }
  }

  const searchBook = () => {
    // console.log("inside..");
    const token = sessionStorage.getItem("token")

    if(searchKey == ""){
      toast.info("Please enter the Title of any Book!!")
    }
    else if(!token){
      toast.info("Please Login!!!")
      setTimeout(()=>{
        navigate("/login")
      },2500)
    }
    else if(searchKey && token){
      navigate("/all-books")
    }else{
      toast.error("Something Went Wrong...")
    }
  }

  useEffect(() => {
    setSearchkey("")
    getHomeBooks()
  }, [])


  return (
    <>
      <Header />
      <header className='flex justify-center items-center'>
        <div id='main' className='flex justify-center items-center w-full'>
          <div className='md:grid grid-cols-3 w-full'>
            <div></div>
            <div className='text-white flex justify-center items-center flex-col'>
              <h1 className='text-5xl'>Wonderful Grits</h1>
              <p>Give your family and friends a book</p>

              <div className="flex mt-10 w-full">
                <input onChange={(e) => setSearchkey(e.target.value)} type="text" placeholder='Search Books Title' className='rounded-xl bg-white py-2 px-4 placeholder-gray-500 w-full text-black' />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='text-blue-800' style={{ marginTop: '11px', marginLeft: '-30px' }} onClick={searchBook} />
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </header>

      {/* new Arrivals*/}
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <h2>NEW ARRIVALS</h2>
        <h4>Explore Our Latest Collection</h4>

        <div className="md:grid grid-cols-4 w-full mt-5">
          {homeBook?.length > 0 ?
            homeBook?.map((item) => (<div className="p-3">
              <img src={item?.imageurl} alt='no image' style={{ width: '100%', height: "300px" }} />
              <div className='flex justify-center flex-col items-center mt-3'>
                <p>{item?.author}</p>
                <h3>{item?.title}</h3>
                <p>${item?.dPrice}</p>
              </div>
            </div>))

            :
            <p>Loading...</p>
          }


        </div>

        <div className='flex justify-center items-center my-5'>
          <Link to={'/all-books'}><button className='px-3 py-2 bg-blue-800 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>Explore More</button></Link>
        </div>

      </section>


      {/* author */}
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <div className="md:grid grid-cols-2 w-full">
          <div>
            <div className="flex justify-center items-center flex-col">
              <h4>Featured Authors</h4>
              <h3 className="text-2xl">Captivates with every word</h3>
            </div>
            <p className='mt-6 text-justify'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, molestiae dolores quasi neque nisi minus consequatur. Consequuntur qui maiores, nisi esse incidunt quos dolores nihil, reiciendis voluptatem fugit, non ut!
              Eum, molestiae quaerat! Iste magnam perferendis necessitatibus architecto soluta temporibus earum ipsam officia repellendus molestiae eaque asperiores assumenda, consequuntur libero doloremque fugit odio dolorem quis illo aliquam praesentium enim quisquam.
            </p>
            <p className='mt-6 text-justify'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, molestiae dolores quasi neque nisi minus consequatur. Consequuntur qui maiores, nisi esse incidunt quos dolores nihil, reiciendis voluptatem fugit, non ut!
              Eum, molestiae quaerat! Iste magnam perferendis necessitatibus architecto soluta temporibus earum ipsam officia repellendus molestiae eaque asperiores assumenda, consequuntur libero doloremque fugit odio dolorem quis illo aliquam praesentium enim quisquam.
            </p>
          </div>
          <div className="px-2 pt-8 ms-6">
            <img src="https://media.istockphoto.com/id/1326638534/photo/beautiful-african-american-woman-holding-red-book-looking-at-window-and-smiling-university.jpg?s=612x612&w=0&k=20&c=dOopOrEfKZuzBW3--hW-e0DXhmaQBc5LSoZTOuRmqnc=" alt="no image" className='w-full' />
          </div>
        </div>
      </section>

      {/* testimonials */}
      <div className='flex justify-center items-center flex-col md:py-10 md:px-40'>
        <h3>TESTIMONIALS</h3>
        <h3 className='text-2xl'>See What Others Are Saying</h3>
        <img src="https://t4.ftcdn.net/jpg/07/98/16/13/360_F_798161317_4zyCUubM3u07DzwAJPNEmn71ho6qU5rc.jpg" alt="no image" style={{ width: '150px', height: '150px', borderRadius: '50%' }} className='mt-5' />
        <h6 className="mt-3">Alex</h6>
        <p className="mt-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab dolores corporis blanditiis iure. Reiciendis quos aliquam natus impedit ea, a sint! Pariatur doloribus ab eligendi quos eos velit autem iusto.</p>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />

      <Footer />
    </>
  )
}

export default Home