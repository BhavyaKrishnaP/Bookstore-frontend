import { faBook, faGear, faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverURL } from '../../services/serverURL'
import { adminProfileUpdateContext } from '../../context/Contextshare'

const AdminSidebar = () => {
    const [HomeStatus, setHomeStatus] = useState(false)
    const [BookStatus, setBookStatus] = useState(false)
    const [SettingsStatus, setSettingsStatus] = useState(false)
    const [adminDetails, setAdminDetails] = useState({
        username: "",
        profile: ""
    })

    const navigate = useNavigate()
    const {adminProfileStatus} = useContext(adminProfileUpdateContext)

    const pageSwap = (data) => {
        if (data == "home") {
            navigate('/admin-home')
        } else if (data == "books") {
            navigate('/admin-books')
        } else if (data == "settings") {
            navigate('/admin-settings')
        } else {
            navigate("*")
        }
    }

    useEffect(() => {
        // console.log(location.pathname);
        if (location.pathname == "/admin-home") {
            setHomeStatus(true)
        } else if (location.pathname == "/admin-books") {
            setBookStatus(true)
        } else if (location.pathname == "/admin-settings") {
            setSettingsStatus(true)
        } else {
            console.log("No such page");
        }

        if(sessionStorage.getItem("token")) {
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setAdminDetails({ username:user.username, profile:user.profile})
        }

    }, [adminProfileStatus])

    return (
        <>
            <div className='flex flex-col items-center justify-center p-1'>
                <img src={adminDetails.profile ==""? "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" : `${serverURL}/upload/${adminDetails.profile}`} alt="no image" style={{ width: '150px', height: '150px' }} />
                <h1 className='mt-5'>{adminDetails.username}</h1>
            </div>


            <div className="m-5">
                <div className="mb-3" >
                    <input type="radio" id='home' name='filter' readOnly checked={HomeStatus} />
                    <label htmlFor="home" className='ms-3' onClick={() => pageSwap("home")}><FontAwesomeIcon icon={faHouse} className='me-3' />Home</label>
                </div>

                <div className="mb-3" >
                    <input type="radio" id='books' name='filter' readOnly checked={BookStatus} />
                    <label htmlFor="books" className='ms-3' onClick={() => pageSwap("books")}><FontAwesomeIcon icon={faBook} className='me-3' /> All Books </label>
                </div>
                <div className="mb-3" >
                    <input type="radio" id='settings' name='filter' readOnly checked={SettingsStatus} />
                    <label htmlFor="settings" className='ms-3' onClick={() => pageSwap("settings")}><FontAwesomeIcon icon={faGear} className='me-3' /> Settings </label>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar