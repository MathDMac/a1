import { useEffect } from "react"
import {Routes, Route, Navigate} from "react-router-dom"
import { authStoreManager } from "./store/store.js"
import {Profile} from "./pages/Profile.jsx"
import {HomePage} from "./pages/HomePage.jsx"
import {Login} from "./pages/Login.jsx"
import {Signup} from "./pages/Signup.jsx"
import { Navbar } from "./components/Navbar.jsx"
import { Toaster } from "react-hot-toast"

import {LoaderCircle} from "lucide-react"




function App() {
  const {userAuth, isCheckingAuth, checkUser} = authStoreManager()


  useEffect(()=>{
    checkUser()
  }, [checkUser])

  if(!userAuth && isCheckingAuth){
    return 
    <div>
      <LoaderCircle />
    </div>
  }

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={userAuth? <HomePage/> : <Navigate to= "/login"/>}/>
        <Route path="/login" element={!userAuth? <Login/> : <Navigate to= "/"/>}/>
        <Route path="/signup" element={!userAuth? <Signup/> : <Navigate to= "/"/>}/>
        <Route path="/profile/:id" element={userAuth? <Profile/> : <Navigate to= "/login"/>}/>      
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
