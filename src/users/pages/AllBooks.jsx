import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { getAllBooksAPI } from '../../services/allAPIs'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { searchKeyContext } from '../../context/Contextshare'

const AllBooks = () => {

  const [status, setStatus] = useState(false)

  const [allBooks, setAllBooks] = useState([])
  const [tempAllBooks, setTempAllBooks] = useState([])
  const [token, setToken] = useState("")
  const { searchKey, setSearchkey } = useContext(searchKeyContext)

  console.log(searchKey);


  const getAllBooks = async (searchKey, token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    console.log(reqHeader);

    const result = await getAllBooksAPI(searchKey, reqHeader)
    // console.log(result);
    if (result.status == 200) {
      setAllBooks(result.data)
      setTempAllBooks(result.data)
    }
  }
  console.log(allBooks);

  const filter = (data) => {
    if (data == "NoFilter") {
      setAllBooks(tempAllBooks)
    } else {
      setAllBooks(tempAllBooks.filter((item) => item.category.toLowerCase() == data.toLowerCase()))
    }
  }


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const tok = sessionStorage.getItem("token")
      setToken(tok)
      getAllBooks(searchKey, tok)
    }
  }, [searchKey])


  return (
    <>
      <Header />

      {token ? (
        <>
          <div className='flex justify-center items-center flex-col'>
            <h1 className='mt-5 text-3xl font-medium'>Collections</h1>
            <div className='flex my-8 w-full justify-center items-center'>
              <input
                value={searchKey}
                onChange={(e) => setSearchkey(e.target.value)}
                type="text" placeholder='Search By Title'
                className='border border-gray-200 placeholder-gray-200 p-2 w-1/4 me-2' />
              {/* <button className='bg-blue-900 text-white py-2 px-3 shadow hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>Search</button> */}
            </div>
          </div>

          <div className='md:grid grid-cols-[1fr_4fr] md:p-10 p-5'>
            <div>
              <div className='flex mt-3 justify-between'>
                <h1 className='text-2xl font-medium'>Filters</h1>
                <span onClick={() => setStatus(!status)} className='md:hidden'><FontAwesomeIcon icon={faBars} /></span>
              </div>

              <div className={status ? "md:block" : 'md:block justify-center items-center hidden'}>

                <div className='mt-3' onClick={() => filter("NoFilter")}>
                  <input type="radio" id='NoFilter' name='filter' />
                  <label htmlFor="NoFilter" className='ms-3'>All Books</label>
                </div>
                <div className='mt-3' onClick={() => filter("Literary")}>
                  <input type="radio" id='Literary' name='filter' />
                  <label htmlFor="Literary" className='ms-3'>Literary</label>
                </div>
                <div className='mt-3' onClick={() => filter("Novel")}>
                  <input type="radio" id='Novel' name='filter' />
                  <label htmlFor="Novel" className='ms-3'>Novel</label>
                </div>
                <div className='mt-3' onClick={() => filter("Detective")}>
                  <input type="radio" id='Detective' name='filter' />
                  <label htmlFor="Detective" className='ms-3'>Detective</label>
                </div>
                <div className='mt-3' onClick={() => filter("Autobiography")}>
                  <input type="radio" id='Autobiography' name='filter' />
                  <label htmlFor="Autobiography" className='ms-3'>Autobiography</label>
                </div>

              </div>
            </div>

            <div className="md:grid grid-cols-4 w-full mt-5">
              {allBooks?.length > 0 ? 
                allBooks?.map((item) => (
                  <div className="p-3" hidden={item?.status == "pending" || item?.status == 'sold'}>
                    <img src={item?.imageurl} alt='no image' style={{ width: '100%', height: "300px" }} />
                    <div className='flex justify-center flex-col items-center mt-3'>
                      <p>{item?.author}</p>
                      <h3>{item?.title}</h3>
                      <Link to={`/view-books/${item?._id}`}><button className='w-full mt-3 px-3 py-2 bg-blue-900 text-white hover:border hover:border-blue-900 hover:bg-white hover:text-blue-900'>View More</button></Link>
                    </div>
                  </div>
                ))

                :
                <p>No Books Added..</p>
              }
            </div>

          </div>
        </> 
      )

        :

        <div className='grid justify-center items-center text-center p-8'>
          <img src="https://imagedelivery.net/IEMzXmjRvW0g933AN5ejrA/wwwnotionso-image-mediagiphycom-media-ghpob1fevwu5ghl2tk-giphygif/public" alt="logo gif" style={{ width: "300px", height: "300px" }} />
          <p className='text-xl text-red-500 font-semibold mt-6'>Please <span className=' text-xl text-blue-700 font-medium underline cursor-pointer'><Link to={'/login'}>Login</Link></span> to Explore More..</p>
        </div>
      }

      <Footer />
    </>
  )
}

export default AllBooks