import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import EditProfile from '../components/EditProfile'
import { toast, ToastContainer } from 'react-toastify'
import { addBookAPI, deleteAUserBookAPI, getAllUserBooksAPI, getAllUserBroughtBookAPI } from '../../services/allAPIs'
import { userProfileUpdateContext } from '../../context/Contextshare'
import { serverURL } from '../../services/serverURL'

const Profile = () => {
  const [sellStatus, setSellStatus] = useState(true)
  const [userBookStatus, setUserBookStatus] = useState(false)
  const [purchaseStatus, setPurchaseStatus] = useState(false)
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    noofpages: "",
    imageurl: "",
    price: "",
    dPrice: "",
    abstract: "",
    publisher: "",
    language: "",
    isbn: "",
    category: "",
    uploadedImages: []
  })

  const [preview, setPreview] = useState("")
  const [previewList, setPreviewList] = useState([])
  const [token, setToken] = useState("")

  const [profile, setprofile] = useState("")
  const [userBooks, setUserBooks] = useState([])
  const [userBroughtBooks, setUserBroughtBooks] = useState([])
  const [deleteStatus, setDeleteStatus] = useState("")
 
  const { userProfileStatus } = useContext(userProfileUpdateContext)


  console.log(bookDetails);

  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const fileArray = bookDetails.uploadedImages
    fileArray.push(e.target.files[0])
    setBookDetails({ ...bookDetails, uploadedImages: fileArray })

    const url = URL.createObjectURL(e.target.files[0])
    console.log(url);
    setPreview(url)

    const newArray = previewList
    newArray.push(url)
    setPreviewList(newArray)
  }

  const handleReset = () => {
    setBookDetails({ title: "", author: "", noofpages: "", imageurl: "", price: "", dPrice: "", abstract: "", publisher: "", language: "", isbn: "", category: "", uploadedImages: [] })
    setPreview("")
    setPreviewList([])
  }

  const handleSubmit = async () => {
    const { title, author, noofpages, imageurl, price, dPrice, abstract, publisher, language, isbn, category, uploadedImages } = bookDetails

    if (!title || !author || !noofpages || !imageurl || !price || !dPrice || !abstract || !publisher || !language || !isbn || !category || uploadedImages.length == 0) {
      toast.warning("Please fill the fields!!!")
    } else {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const reqBody = new FormData()

      for (let key in bookDetails) {
        if (key != "uploadedImages") {
          reqBody.append(key, bookDetails[key])
        } else {
          bookDetails.uploadedImages.forEach((item) => {
            reqBody.append("uploadedImages", item)
          })
        }
      }
      const result = await addBookAPI(reqBody, reqHeader)
      console.log(result);

      if (result.status == 401) {
        toast.warning(result.response.data)
        handleReset()
      } else if (result.status == 200) {
        toast.success("Book Added Successfully")
        handleReset()
      } else {
        toast.error("Some thing went wrong")
        handleReset()
      }

    }
  }

  const getAllUserBooks = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllUserBooksAPI(reqHeader)
    console.log(result);
    if (result.status == 200) {
      setUserBooks(result.data)
    }
  }

  const getAllUserBroughtBooks = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllUserBroughtBookAPI(reqHeader)
    console.log(result);
    if (result.status == 200) {
      setUserBroughtBooks(result.data)
    }
  }

  const deleteBook = async(id) => {
    const result = await deleteAUserBookAPI(id)
    console.log(result);
    toast.success(result.data)
    if(result.status==200){
      setDeleteStatus(result.data)
    }

  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)

      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setprofile(user.profile)
    }
  }, [userProfileStatus])

  useEffect(() => {
    if (userBookStatus == true) {
      getAllUserBooks()
    } else if (purchaseStatus == true) {
      getAllUserBroughtBooks()
    } else {
      console.log("Something Went Wrong");
    }
  }, [userBookStatus, purchaseStatus,deleteStatus])


  return (
    <>
      <Header />
      <div style={{ height: '200px' }} className='bg-gray-900'></div>
      <div style={{ width: '230px', height: '230px', borderRadius: '50%', marginLeft: '70px', marginTop: '-130px' }} className='bg-white p-3'>

        <img src={profile == "" ? "https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg" : profile.startsWith("https://lh3.googleusercontent.com") ? profile : `${serverURL}/upload/${profile}`} alt="User Icon" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
      </div>
      <div className='flex justify-between px-20 mt-5'>
        <p className='flex justify-center items-center'><span className='text-3xl'>Bhavya</span>
          <FontAwesomeIcon icon={faCircleCheck} className='text-blue-400 ms-3' /></p>
        <EditProfile />
      </div>
      <p className='md:px-20 my-4 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum accusamus dolores, facere culpa sed modi quisquam velit at magnam similique blanditiis aliquam incidunt, laudantium quod non ipsum beatae eligendi possimus?
        Eaque necessitatibus eligendi tempora aliquid! Aut quae vel cupiditate molestiae explicabo. Molestias tempora quae natus consectetur commodi ab, voluptate repellendus dicta vel! Iure dolorum nam rem est sunt doloremque omnis.
      </p>


      <div className='md:px-40'>
        {/* tabs */}
        <div className='flex justify-center items-center my-5'>
          <p onClick={() => { setSellStatus(true); setUserBookStatus(false); setPurchaseStatus(false) }} className={sellStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : userBookStatus ? 'p-4 text-black border-b border-gray-200' : "p-4 text-black border-b border-gray-200"}>Sell Books</p>

          <p onClick={() => { setSellStatus(false); setUserBookStatus(true); setPurchaseStatus(false) }} className={userBookStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : sellStatus ? 'p-4 text-black border-b border-gray-200' : "p-4 text-black border-b border-gray-200"}>Book Status</p>

          <p onClick={() => { setSellStatus(false); setUserBookStatus(false); setPurchaseStatus(true) }} className={purchaseStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : sellStatus ? 'p-4 text-black border-b border-gray-200' : "p-4 text-black border-b border-gray-200"}>Purchase History</p>
        </div>
      </div>

      {/* content */}

      {sellStatus &&
        <div className='bg-gray-200 p-10 mt-20'>
          <h1 className='text-center text-3xl font-medium'>Book Details</h1>
          <div className="md:grid grid-cols-2 mt-5 w-full">
            <div className='px-3'>
              <div className="mb-3">
                <input value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} type="text" placeholder='Title' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <input value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} type="text" placeholder='Author' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <input value={bookDetails.noofpages} onChange={(e) => setBookDetails({ ...bookDetails, noofpages: e.target.value })} type="text" placeholder='No of Pages' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <input value={bookDetails.imageurl} onChange={(e) => setBookDetails({ ...bookDetails, imageurl: e.target.value })} type="text" placeholder='Image URL' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <input value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} type="text" placeholder='Prize' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <input value={bookDetails.dPrice} onChange={(e) => setBookDetails({ ...bookDetails, dPrice: e.target.value })} type="text" placeholder='dPrize' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <textarea value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} rows={5} type="text" placeholder='Abstract' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
            </div>
            <div className="px-3">
              <div className="mb-3">
                <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} type="text" placeholder='Publisher' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <input value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} type="text" placeholder='Language' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} type="text" placeholder='ISBN' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <input value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} type="text" placeholder='Category' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>

              <div className="mb-5 flex justify-center items-center w-full mt-10">
                {!preview ?
                  <label htmlFor="imageFile">
                    <input type="file" id='imageFile' style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                    <img src="https://www.pngkit.com/png/full/129-1298005_png-file-upload-image-icon-png.png" alt="no image" style={{ width: '200px', height: '200px' }} />
                  </label> :
                  <img src={preview} alt="no image" style={{ width: '200px', height: '200px' }} />
                }
              </div>

              {preview &&
                <div className='flex justify-center items-center'>
                  {previewList?.map((item) => (
                    <img src={item} alt="no image" style={{ width: '70px', height: '70px', marginRight: "5px" }} />
                  ))}

                  {previewList.length < 3 &&
                    <label htmlFor="imageFile">
                      <input type="file" id='imageFile' style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                      <FontAwesomeIcon icon={faSquarePlus} className='fa-2x shadow ms-3' />
                    </label>}

                </div>}

            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={handleReset} className='bg-amber-600 rounded text-black p-3 hover:bg-white hover:border hover:border-amber-600 hover:text-amber-600'>Reset</button>
            <button onClick={handleSubmit} className='bg-green-600 rounded text-black p-3 hover:bg-white hover:border hover:border-green-600 hover:text-green-600 ms-3'>Submit</button>
          </div>
        </div>
      }


      {userBookStatus &&
        <div className='p-10 m-20 shadow rounded'>
          {userBooks?.length > 0 ?
            userBooks?.map((item) => (
              <div className='bg-gray-200 p-5 rounded m-2'>
                <div className='md:grid grid-cols-[3fr_1fr]'>
                  <div>
                    <h1 className='text-2xl'>{item?.title}</h1>
                    <h2>{item?.author}</h2>
                    <h3 className='text-blue-600'>$ {item?.price}</h3>
                    <p>Abstract : {item?.abstract}</p>
                    <div className='flex'>
                      {item?.status == "pending" ? <img src="https://psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png" alt="Pending.." style={{ width: '70px', height: '70px' }} /> : item?.status == "approved" ?

                        <img src="https://png.pngtree.com/png-vector/20241016/ourmid/pngtree-approved-green-stamp-vector-png-image_14101935.png" alt="Approved.." style={{ width: '70px', height: '70px' }} /> :

                        <img src="https://png.pngtree.com/png-clipart/20250107/original/pngtree-circle-sold-red-stamp-with-texture-vector-png-image_19293935.png" alt="Sold.." style={{ width: '70px', height: '70px' }} />}
                    </div>
                  </div>

                  <div>
                    <img className='w-full' src={item?.imageurl} alt="no image" style={{ height: '350px' }} />
                    <div className="flex justify-end mt-4">
                      <button onClick={()=>deleteBook(item?._id)} className='p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))  :
            // {/* no books */}
            <div className='flex justify-center items-center flex-col'>
              <img src="https://media.baamboozle.com/uploads/images/1966366/f89c2332-2b52-459b-ad9d-377e1a945b75.gif" alt="No book Yet.." style={{ width: '200px', height: '200px' }} />
              <p className='text-red-600 text-2xl'>No Books Added Yet!!</p>
            </div>}
        </div>
      }


      {purchaseStatus &&
        <div className='p-10 m-20 shadow rounded'>
          {userBroughtBooks?.length > 0 ?
            userBroughtBooks?.map((item) => (
              <div className='bg-gray-200 p-5 rounded m-2'>
                <div className='md:grid grid-cols-[3fr_1fr]'>
                  <div>
                    <h1 className='text-2xl'>{item?.title}</h1>
                    <h2>{item?.author}</h2>
                    <h3 className='text-blue-600'>$ {item?.price}</h3>
                    <p>Abstract : {item?.abstract}</p>
                  </div>

                  <div>
                    <img className='w-full' src={item?.imageurl} alt="no image" style={{ height: '350px' }} />
                    <div className="flex justify-end mt-4">
                      <button className='p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))

            :

            // {/* no books */}
            <div className='flex justify-center items-center flex-col'>
              <img src="https://media.baamboozle.com/uploads/images/1966366/f89c2332-2b52-459b-ad9d-377e1a945b75.gif" alt="No book Yet.." style={{ width: '200px', height: '200px' }} />
              <p className='text-red-600 text-2xl'>No Books Added Yet!!</p>
            </div>}
        </div>
      }

      <ToastContainer theme='colored' position='top-center' autoClose={2000} />

      <Footer />
    </>
  )
}

export default Profile