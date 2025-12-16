import React, { createContext, useState } from 'react'


export const searchKeyContext = createContext("")
export const adminProfileUpdateContext = createContext("")
export const userProfileUpdateContext = createContext("")


const Contextshare = ({children}) => {

    const [searchKey, setSearchkey] = useState("")
    const [adminProfileStatus, setAdminProfileStatus] = useState({})
    const [userProfileStatus, setUserProfileStatus] = useState({})


  return (
    <userProfileUpdateContext.Provider value={{userProfileStatus,setUserProfileStatus}}>
      <adminProfileUpdateContext.Provider value={{adminProfileStatus,setAdminProfileStatus}}>
        <searchKeyContext.Provider value={{setSearchkey,searchKey}}>
            {
                children 
            }
        </searchKeyContext.Provider>
      </adminProfileUpdateContext.Provider>
    </userProfileUpdateContext.Provider>
  )
}

export default Contextshare