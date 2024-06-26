import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import {useAuth} from '../Hooks/authHook'

function PrivateRoute() {
    const {contextToken}  = useAuth()

    //if token is presence and login is true allow components to pass through <Outlet/>
    //or else redirect to login path
  return (
    <>
    {
        contextToken?.token || contextToken?.login ? <Outlet/> : <Navigate to={`/login`}/> //only development
        // contextToken?.token && contextToken?.login ? <Outlet/> : <Navigate to={`/login`}/>  only production

    }
    </>
  )
}

export default PrivateRoute