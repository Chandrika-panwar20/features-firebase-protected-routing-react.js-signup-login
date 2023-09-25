import React from 'react'
import { Route, Routes } from "react-router-dom"

import { Login, SignUp } from '../screens'

export const PublicRoutes = () => {
  return (
    <Routes >
       <Route path = "/" element = {<SignUp/>} />
      <Route path = "/Login" element = {<Login />} />
    </Routes>
  )
}