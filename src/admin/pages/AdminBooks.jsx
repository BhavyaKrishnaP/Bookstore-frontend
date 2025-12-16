import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../components/Footer'
import { approveBooksAPI, getAllBooksAdminAPI, getAllUsersAPI } from '../../services/allAPIs'

const AdminBooks = () => {
  const [bookStatus, setBookStatus] = useState(true)
  const [userStatus, setUserStatus] = useState(false)
  const [bookDetails, setBookDetails] = useState([])
  const [token, setToken] = useState("")
  const [approveStatus, setApproveStatus] = useState(false)
  const [users, setUsers] = useState([])



  const getAllBookAdmin = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    };
    const result = await getAllBooksAdminAPI(reqHeader)
    console.log(result.data);
    if (result.status == 200) {
      setBookDetails(result.data)
    }
  }

  const approveBook = async (data) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    };
    const result = await approveBooksAPI(reqHeader, data)
    console.log(result.data);
    if (result.status == 200) {
      setApproveStatus(true)
    } else {
      alert("Something went wrong")
    }

  }

  const getAllUsers = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    };
    const result = await getAllUsersAPI(reqHeader)
    console.log(result);
    if (result.status == 200) {
      setUsers(result.data)
    }
  }


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
      getAllBookAdmin(token)
    }
    if (userStatus == true) {
      getAllUsers()
    }
  }, [approveStatus, userStatus])


  return (
    <>
      <AdminHeader />
      <div className="md:grid grid-cols-[1fr_4fr]">
        <div className='bg-blue-200 p-4'>
          <AdminSidebar />
        </div>
        <div>
          <h1 className='text-center text-xl p-3'>All Books</h1>
          <div className='md:px-40'>
            <div className='flex justify-center items-center my-5'>
              <p onClick={() => { setBookStatus(true); setUserStatus(false) }} className={bookStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : "p-4 text-black border-b border-gray-200"}>Book List</p>

              <p onClick={() => { setBookStatus(false); setUserStatus(true) }} className={userStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : "p-4 text-black border-b border-gray-200"}>Users</p>

            </div>
          </div>

          {bookStatus && (
            <div className="md:grid grid-cols-4 gap-3 w-full px-10 py-10">

              {bookDetails?.length > 0 ?
                bookDetails?.map((item) => (
                  <div className='p-3'>
                    <div className={item.status == 'sold' ? "shadow-md opacity-58 p-3" : "p-3 shadow-md"}>
                      <img src={item?.imageurl} alt='no image' style={{ width: '100%', height: "300px" }} />
                      <div className='flex justify-center flex-col items-center mt-3'>
                        <p className='text-blue-600'>{item?.author}</p>
                        <h3>{item?.title}</h3>
                        <p className='text-blue-600'>${item?.dPrice}</p>
                        {item?.status == "pending" && <button onClick={() => approveBook(item)} className='w-full mt-3 px-3 py-2 bg-green-900 text-white font-medium hover:border hover:border-green-900 hover:bg-white hover:text-green-900'>Approve</button>}


                        {item?.status == "approved" && <div className="flex justify-end w-full">
                          <img src="https://img.freepik.com/premium-vector/check-mark-icon-green-color_172976-2945.jpg" alt="approved" style={{ width: '40px', height: '40px' }} />
                        </div>}

                      </div>
                    </div>
                  </div>
                ))

                :
                <p>No Books Added...</p>
              }

            </div>
          )}

          {userStatus && (
            <div className='md:grid grid-cols-3 p-10'>

              {users?.length>0 ? 
              users?.map((user)=>(
              <div className="rounded bg-gray-200 p-4 md:m-4 mt-4">
                <p className='ms-5 text-red-600'>ID : {user?._id}</p>
                <div className='grid grid-cols-[1fr_2fr] mt-3'>
                  <div className='flex justify-center items-center'>
                    <img src={user?.profile ==""? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCbU49DD_iYcjSUEXG-Oy7POjJzaMn1GYEZg&s" : user?.profile} alt="no image" style={{ width: '70px', height: '70px', borderRadius: '50%' }} />
                    
                  </div>
                  <div>
                    <p className='text-lg text-blue-700'>{user?.username}</p>
                    <p className='text-sm text-orange-500'>{user?.email}</p>
                  </div>
                </div>
              </div>
              ))
              
              :
              <p>No users....</p>
              }

            </div>
          )

          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AdminBooks