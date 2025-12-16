import { Route, Routes } from 'react-router-dom'
import Home from './users/pages/Home'
import Auth from './pages/Auth'
import PagenotFound from './pages/PagenotFound'
import { useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import Careers from './users/pages/Careers'
import Contact from './users/pages/Contact'
import AllBooks from './users/pages/AllBooks'
import Profile from './users/pages/Profile'
import AdminHome from './admin/pages/AdminHome'
import AdminBooks from './admin/pages/AdminBooks'
import AdminSettings from './admin/pages/AdminSettings'
import Viewbook from './users/pages/Viewbook'
import PaySuccess from './users/pages/PaySuccess'
import PayError from './users/pages/PayError'


function App() {

  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(true)
    },7000)
  },[])

  return (
    <>
      
      <Routes>
        <Route path='/' element={loading ? <Home/> : <Preloader/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth register/>}/>
        {/* <Route path='/careers' element={<Careers/>}/> */}
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/all-books' element={<AllBooks/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/view-books/:id' element={<Viewbook/>}/>
        <Route path='/admin-home' element={loading ?<AdminHome/> : <Preloader/>}/>
        <Route path='/admin-books' element={<AdminBooks/>}/>
        <Route path='/admin-settings' element={<AdminSettings/>}/>
        <Route path='/payment-success' element={<PaySuccess/>}/>
        <Route path='/payment-error' element={<PayError/>}/>
        <Route path='*' element={<PagenotFound/>}/>
      </Routes>
      
    </>
  )
}

export default App
