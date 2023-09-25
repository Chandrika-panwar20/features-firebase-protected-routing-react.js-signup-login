import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { getCurrentUser } from '../firebase'
import { DashBoard } from '../screens'


export const ProtectedRoutedNaviagtion = () => {
    const [loading, setLoading] = useState(true);
    const [currentUSer, setCurrentUser] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await getCurrentUser();
                setCurrentUser(res.uid)
                setLoading(false)
            }
            catch (error) {
                setLoading(true)
                navigate("/")
            }
        }
        getUser()
    }, [])
    
    return (
        <div>
            <Routes>
                <Route path = "/DashBoard" element = {<Protected currentUser={currentUSer} loading={loading} >
                    <DashBoard /> </Protected>} >
                </Route>
            </Routes>
        </div>
    )
}

export const Protected = ({ children, loading }) => {

    if (loading) {
        return <h4>Loding.....</h4>
    } else {
        return (children)
    }

}

