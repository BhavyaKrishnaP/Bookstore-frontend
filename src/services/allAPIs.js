import {commonAPI} from './commonAPI'
import {serverURL} from './serverURL'

// register
export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}

// login
export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}

// google login
export const googleLoginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/google-login`,reqBody)
}

// get home books - home-books
export const getHomeBooksAPI = async()=>{
    return await commonAPI("GET",`${serverURL}/home-books`)
}

// .................User.................
export const addBookAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/add-book`,reqBody,reqHeader)
}

// get all books - all-books
export const getAllBooksAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/all-books?search=${searchKey}`,"",reqHeader)
}

// get to view a book
export const viewBookApi = async(id)=>{
    return await commonAPI("GET",`${serverURL}/view-books/${id}`)
}

// update user profile - /user-profile-update
export const userProfileUpdateAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/user-profile-update`,reqBody,reqHeader)
}

// get all user added books - /user-add-books
export const getAllUserBooksAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/user-add-books`,"",reqHeader)
}

// get all user brought books
export const getAllUserBroughtBookAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/user-brought-books`,"",reqHeader)
}


// delete user book - delete-user-book/:id
export const deleteAUserBookAPI = async(id)=>{
    return await commonAPI("DELETE",`${serverURL}/delete-user-book/${id}`)
}

// to make payment
export const makepaymentAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/make-payment`,reqBody,reqHeader)
}



// ................. ADMIN .................

// get all books - all Admin-books
export const getAllBooksAdminAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/admin-all-books`,"",reqHeader)
}


// aapprove books - /approve-books
export const approveBooksAPI = async(reqHeader,reqBody)=>{
    return await commonAPI("PUT",`${serverURL}/approve-books`,reqBody,reqHeader)
}

// get all users - all all-users
export const getAllUsersAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/all-users`,"",reqHeader)
}

// update admin profile - /admin-profile-update
export const adminProfileUpdateAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/admin-profile-update`,reqBody,reqHeader)
}
