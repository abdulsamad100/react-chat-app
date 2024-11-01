import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';


const Routechecker = () => {
    const { signin } = useContext(AuthContext);
    return (
        <>
            {!signin.userLoggedIn ? <Outlet /> : <Navigate to = "/Dashboard" />}
        </>
    )
}

export default Routechecker