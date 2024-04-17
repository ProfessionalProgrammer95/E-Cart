import React, { useState } from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import {useAuth} from '../Hooks/authHook'
import {toast} from 'react-toastify'
import axios from 'axios'
import useCart from '../Hooks/cartHooks'

function Menu() {
    const {contextToken, setToken, setCurrentUser,setLogin} = useAuth()
    const {cart, total, tax, discount,final, shipping, removeFromCart, increment, decrement} = useCart()

    const [coupon,setCoupon] = useState('')
    // const [shipping,setShipping] = useState(0)
    // const [tax, setTax] = useState(0)
    // const [discount, setDiscount] = useState(0)
    // const [final,setFinal] = useState(0)

    const navigate = useNavigate()

    
    const logout = async () => {
        if(window.confirm(`Are you sure to logout`)){
            await axios.get(`/api/auth/logout`)
            .then(res => {
                toast.success(res.data.msg)
                navigate(`/login`)
                setToken(false)
                setCurrentUser(false)
                setLogin(false)
            }).catch(err => toast.error(err.response.data.msg))
        }else {
            toast.warning("logout terminated")
        }
    }
  return (
    <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-theme fixed-top">
            <div className="container">
                <div className="d-flex align-items-center">
                <button className="btn btn-secondary" data-bs-target="#menu" data-bs-toggle="offcanvas">
                    <i className="bi bi-list"></i>
                </button>
                <NavLink to={`/`} className="navbar-brand">MERN-Project</NavLink>
                </div>

                <span className="link" data-bs-target="#cart" data-bs-toggle="offcanvas">
                    <i className="bi bi-cart text-light"></i>
                </span>
            </div>
        </nav>


        {/* offcanvas menu */}
        <div className="offcanvas offcanvas-end" tabIndex={'-1'} id="menu">
            <div className="offcanvas-header">
                <h6 className="text-dark display-6 offcanvas-title">MERN-Project</h6>
                <button className="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div className="offcanvas-body mt-3 mb-3">
                {
                    contextToken?.token ? <p className="text-dark">Hi, {contextToken?.currentUser.name}</p> :null
                }
                <div className="list-group text-center mt-2 mb-2">
                    <NavLink to={`/`} className="list-group-item">Home</NavLink>
                    <NavLink to={`/about`} className="list-group-item">About</NavLink>
                    <NavLink to={`/contact`} className="list-group-item">Contact</NavLink>
                </div>
                {
                    contextToken?.token && contextToken?.login ? (
                        <div className="list-group text-center mt-3">
                            <NavLink to={`/dashboard/${contextToken?.currentUser.role}`} className="list-group-item">Dashboard</NavLink>
                            <button onClick={logout} className="btn btn-danger mt-2">Logout</button>
                        </div>
                    ) : (
                        <div className="list-group text-center mt-3">
                            <NavLink to={`/login`} className="list-group-item">Login</NavLink>
                            <NavLink to={`/register`} className="list-group-item">Register</NavLink>
                        </div>
                    )
                }
            </div>
        </div>

        {/* cart offcanvas menu*/}
        <div className="offcanvas offcanvas-end" tabIndex={'-1'} id="cart">
            <div className="offcanvas-header">
                <h6 className="text-dark display-6 offcanvas-title">Cart</h6>
                <button className="btn-close" data-bs-dismiss="offcanvas"/>
            </div>
            <div className="offcanvas-body">

            </div>
        </div>

    </header>
  )
}

export default Menu