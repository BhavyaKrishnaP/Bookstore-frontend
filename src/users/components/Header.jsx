import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faAddressCard, faBars, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userProfileUpdateContext } from '../../context/Contextshare'
import { serverURL } from '../../services/serverURL'

const Header = () => {
  const [status, setStatus] = useState(false)
  const [dropDownStatus, setDropDownStatus] = useState(false)
  const [token, setToken] = useState("")

  const [profile, setprofile] = useState("")
  
  const {userProfileStatus} = useContext(userProfileUpdateContext)


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)

      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setprofile(user.profile)
    }
  }, [userProfileStatus])

  console.log(token);


  return (
    <>
      <div className="md:grid grid-cols-3 p-3">
        <div className='flex items-center'>
          <img src="https://www.kindpng.com/picc/m/19-194546_icon-book-transparent-book-icon-png-png-download.png" alt="logo" style={{ width: '50px', height: '50px' }} />
          <h1 className='text-2xl md:hidden ms-2'>BOOK STORE</h1>
        </div>
        <div className='md:flex justify-center items-center hidden'>
          <h1 className='text-3xl'>BOOK STORE</h1>
        </div>
        <div className="md:flex justify-end items-center hidden">
          <FontAwesomeIcon icon={faInstagram} className='me-3' />
          <FontAwesomeIcon icon={faXTwitter} className='me-3' />
          <FontAwesomeIcon icon={faFacebookF} className='me-3' />

          {!token ?
            <Link to={'/login'}>
              <button className='border border-black rounded px-3 py-2 ms-3 me-3'>
                <FontAwesomeIcon icon={faUser} className='me-2' />Login</button>
            </Link>
            :
            // {/* dropdown */}
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs  hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => setDropDownStatus(!dropDownStatus)}
                >

                  <img src={profile == "" ? "https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg" : profile.startsWith("https://lh3.googleusercontent.com") ? profile : `${serverURL}/upload/${profile}`} alt="User Icon" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />

                </button>
              </div>

              {dropDownStatus && <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  <Link to={'/profile'}>
                    <p
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      <FontAwesomeIcon icon={faAddressCard} className="me-2" />{" "}
                      Profile
                    </p>
                  </Link>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                  >
                    <FontAwesomeIcon icon={faPowerOff} className="me-2" />
                    Logout
                  </button>
                </div>
              </div>}
            </div>
          }
        </div>
      </div>

      <nav className='p-3 w-full bg-gray-900 text-white md:flex justify-center'>
        <div className='flex justify-between px-3 md:hidden'>
          <span onClick={() => setStatus(!status)} className='text-2xl'><FontAwesomeIcon icon={faBars} /></span>

          {!token ?
            <Link to={'/login'}>
              <button className='border border-black rounded px-3 py-2 ms-3'>
                <FontAwesomeIcon icon={faUser} className='me-2' />Login
              </button>
            </Link>
            :
            // {/*dropdown */}
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs  hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => setDropDownStatus(!dropDownStatus)}
                >

                  <img src={profile == "" ? "https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg" : profile.startsWith("https://lh3.googleusercontent.com") ? profile : `${serverURL}/upload/${profile}`} alt="User Icon" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />

                </button>
              </div>

              {dropDownStatus && <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  <Link to={'/profile'}>
                    <p
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      <FontAwesomeIcon icon={faAddressCard} className="me-2" />{" "}
                      Profile
                    </p>
                  </Link>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                  >
                    <FontAwesomeIcon icon={faPowerOff} className="me-2" />
                    Logout
                  </button>
                </div>
              </div>}
            </div>
          }


        </div>

        <ul className={status ? "md:flex" : "md:flex justify-center hidden"}>
          <Link to={'/'}><li className='mx-4 mt-3 md:mt-0'>Home</li></Link>
          <Link to={'/all-books'}><li className='mx-4 mt-3 md:mt-0'>Books</li></Link>
          {/* <Link to={'/careers'}><li className='mx-4 mt-3 md:mt-0'>Careers</li></Link> */}
          <Link to={'/contact'}><li className='mx-4 mt-3 md:mt-0'>Contact</li></Link>
        </ul>
      </nav>
    </>
  )
}

export default Header