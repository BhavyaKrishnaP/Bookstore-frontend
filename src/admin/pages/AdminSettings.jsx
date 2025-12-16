import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../components/Footer'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast, ToastContainer } from 'react-toastify'
import { adminProfileUpdateAPI } from '../../services/allAPIs'
import { serverURL } from '../../services/serverURL'
import { adminProfileUpdateContext } from '../../context/Contextshare'

const AdminSettings = () => {

    const {setAdminProfileStatus} = useContext(adminProfileUpdateContext)

    const [adminDetails, setAdminDetails] = useState({
        username: "",
        password: "",
        cPassword: "",
        profile: ""
    })
    const [preview, setPreview] = useState("")
    const [token, setToken] = useState("")
    const [existingImg, setExistingImg] = useState("")
    const [updateStatus, setUpdateStatus] = useState({})


    console.log(adminDetails);

    const handleFileAdd = (e) => {
        // console.log(event.target.file[0]);
        const event = e.target.files[0]
        setAdminDetails({ ...adminDetails, profile: event })
        console.log(adminDetails.profile);

        if (event != "") {
            const url = URL.createObjectURL(event)
            setPreview(url)
        }
    }
    console.log(preview);

    //reset function
    const handleReset = () => {
        if (sessionStorage.getItem("token")) {
            // const token = sessionStorage.getItem("token")
            // setToken(token)
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
            setExistingImg(user.profile)
        }
        setPreview("")
    }

    //update function
    const handleUpdate = async () => {
        const { username, password, cPassword, profile } = adminDetails
        console.log(username, password, cPassword, profile);

        if (!username || !password || !cPassword) {
            toast.info("Please enter Details...")
        } else {

            if (password != cPassword) {
                toast.warning("Password Must Match..!!!")
            } else {
                if (preview) {
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    }
                    const reqBody = new FormData()
                    for (let key in adminDetails) {
                        reqBody.append(key, adminDetails[key])
                    }
                    const result = await adminProfileUpdateAPI(reqBody, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        toast.success("Profile Updated...")
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setUpdateStatus(result.data)
                        setAdminProfileStatus(result.data)
                    } else {
                        toast.error("Something Went Wrong...")
                        setUpdateStatus({})
                    }

                } else {
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    }
                    const result = await adminProfileUpdateAPI({ username, password, profile: existingImg }, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        toast.success("Profile Updated...")
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setUpdateStatus(result.data)
                        setAdminProfileStatus(result.data)

                    } else {
                        toast.error("Something Went Wrong...")
                        setUpdateStatus({})
                    }
                }

            }

        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            setToken(token)
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
            setExistingImg(user.profile)
        }
    }, [updateStatus])

    return (
        <>
            <AdminHeader />
            <div className="grid grid-cols-[1fr_4fr]">
                <div className='bg-blue-200'>
                    <AdminSidebar />
                </div>
                <div>
                    <h1 className='text-center text-xl p-3'>Settings</h1>
                    <div className='grid grid-cols-2'>
                        <div className='text-justify px-8 py-10'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur earum saepe sint, officiis autem at ratione, fuga quas, dicta perspiciatis perferendis! Aspernatur ad repellat consectetur? Doloribus culpa excepturi ad est!
                                Sit molestias, ducimus odio corrupti pariatur ipsa perferendis facere eveniet, architecto mollitia fugit officia quaerat placeat cupiditate doloribus consequuntur tempore quia corporis asperiores! Tempora minus dicta temporibus voluptate nisi mollitia.</p> <br />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident similique beatae ducimus praesentium quis ea adipisci doloribus suscipit. Aliquid est laborum voluptates iste facere ipsa doloribus totam explicabo? Velit, excepturi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eveniet laboriosam enim consectetur ipsa quis ea voluptatem hic. Excepturi dignissimos error id eum quis cupiditate quibusdam dolor temporibus nulla modi.</p>
                        </div>

                        <div className='bg-blue-300 px-2 py-10 me-8 mb-8 rounded'>
                            <div className='flex justify-center items-center flex-col'>
                                <label htmlFor="AdminProfilefile">
                                    <input onChange={(e) => handleFileAdd(e)}
                                        type="file" id='AdminProfilefile' style={{ display: "none" }} />

                                    {existingImg == "" ?
                                        <img src={preview ? preview : "https://cdn-icons-png.flaticon.com/256/3177/3177440.png"} alt="user-icon" style={{ width: '200px', height: '200px', marginTop: '30px', borderRadius: "50%" }} />
                                        :
                                        <img src={preview ? preview : `${serverURL}/upload/${existingImg}`} alt="user-icon" style={{ width: '200px', height: '200px', marginTop: '30px', borderRadius: "50%" }} />
                                    }

                                    <div className="bg-yellow-300 z-50 text-white p-4 rounded" style={{ marginLeft: '145px', marginTop: '-50px' }}><FontAwesomeIcon icon={faPen} /></div>
                                </label>

                                <div className="mb-2 mt-5 w-full px-5">
                                    <input
                                        value={adminDetails.username}
                                        onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })} type="text" placeholder='Username' className='w-full border border-gray-300 placeholder-gray-300 p-2 rounded bg-white' />
                                </div>
                                <div className="mb-2 mt-5 w-full px-5">
                                    <input value={adminDetails.password}
                                        onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })} type="text" placeholder='Password' className='w-full border border-gray-300 placeholder-gray-300 p-2 rounded bg-white' />
                                </div>
                                <div className="mb-2 mt-5 w-full px-5">
                                    <input value={adminDetails.cPassword}
                                        onChange={(e) => setAdminDetails({ ...adminDetails, cPassword: e.target.value })} type="text" placeholder='Confirm Password' className='w-full border border-gray-300 placeholder-gray-300 p-2 rounded bg-white' />
                                </div>

                                <div className="flex justify-center items-center mt-4 gap-3">
                                    <button onClick={handleReset} type='button' className='bg-amber-600 text-white p-3 rounded hover:bg-white hover:border hover:border-amber-600 hover:text-amber-600 w-60'>Reset</button>
                                    <button onClick={handleUpdate} type='button' className='bg-green-600 text-white p-3 rounded hover:bg-white hover:border hover:border-green-600 hover:text-green-600 w-60'>Update</button>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />

            <Footer />
        </>
    )
}

export default AdminSettings