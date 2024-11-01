import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AnotherChecker = () => {
    const { signin } = useContext(AuthContext);
    return (
        <>
            {!signin.userLoggedIn ? <Navigate to = "/login" /> : <Outlet />}
        </>
    )
}

export default AnotherChecker