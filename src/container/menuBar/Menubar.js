import { React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getAuth ,signOut } from 'firebase/auth';

import { userFirebase, getCurrentUser } from '../../firebase'
import { Button } from '../../components';
import './menubar.css';

// toast.configure()
export const Menubar = () => {
  const [currentUSer, setCurrentUser] = useState(false)
  const auth = getAuth(userFirebase);

  useEffect(() => {
    const getUser = async () => {
    try {
        const res = await getCurrentUser();
        if(res.uid){
          setCurrentUser(true)
        } 
    }
    catch(error){
        console.error("error inside useEffect in menubar......",error.code)
    }
}
    getUser() 
}, [])

  
  const logout = () => {
    signOut(auth)
    .then( () => {
      window.location.href="/Login"
    })
    .catch((error) => {
      console.log("singout error",error)
    })
  }

  if (currentUSer) {
    return (
      <ul>
        <li className = 'menubar-link'>
          <Link to = "DashBoard" > DashBoard </Link>
        </li>
        <ToastContainer/>
        <li className = 'menubar-link'>
          <Button onClick = {logout} label = {"LogOut"} > </Button>
        </li>
      </ul>)
  } else {
  return (
    <>
      <ul>
        <li className = 'menubar-link'>
          <Link to = "/" > SignUp </Link>
        </li>

        <li className = 'menubar-link'>
          <Link to = "/Login" > Login </Link>
        </li>
      </ul>
    </>
  )
}
}