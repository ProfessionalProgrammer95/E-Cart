import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Menu from './Components/Menu'
import {ToastContainer} from 'react-toastify'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Pnf from './Pages/Pnf'
import Dashboard from './Pages/Dashboard/Dashboard'
import PrivateRoute from './PrivateRouter/PrivateRoute'
import UserDashboard from './Pages/Dashboard/User/UserDashboard'
import AdminDashboard from './Pages/Dashboard/Admin/AdminDashboard'
import AdminProducts from './Pages/Dashboard/Admin/Products/AdminProducts'
import AdminOrders from './Pages/Dashboard/Admin/Orders/AdminOrders'
import AdminCategories from './Pages/Dashboard/Admin/Categories/AdminCategories'
import AdminUsers from './Pages/Dashboard/Admin/Users/AdminUsers'
import NewProduct from './Pages/Dashboard/Admin/Products/NewProduct'
import ProductsHome from './Pages/Products/ProductsHome'
import ProductDetail from './Pages/Products/ProductDetail'
import UpdateProduct from './Pages/Dashboard/Admin/Products/UpdateProduct'

function App() {
  return (
    <BrowserRouter>
        <Menu/>
        <ToastContainer autoClose={4000} position={'top-right'}/>
        <Routes>
          
          <Route element={<PrivateRoute/>}>
              <Route path={`/dashboard`} element={<Dashboard/>}>
                <Route path={`user`} element={<UserDashboard/>}/>
                <Route path={`superadmin`} element={<AdminDashboard/>}>
                  <Route path={`products`} element={<AdminProducts/>}/>
                  <Route path={`products/new`} element={<NewProduct/>}/>
                  <Route path={`products/update/:id`} element={<UpdateProduct/>}/>

                  <Route path={`orders`} element={<AdminOrders/>}/>
                  <Route path={`categories`} element={<AdminCategories/>}/>
                  <Route path={`users`} element={<AdminUsers/>}/>
                </Route>
              </Route>
          </Route>         

          <Route path={`/`} element={<Home/>}>
            <Route path={`/`} element={<ProductsHome/>}/>
            <Route path={`/product/:id`} element={<ProductDetail/>}/>
          </Route>

          <Route path={`/about`} element={<About/>}/>
          <Route path={`/contact`} element={<Contact/>}/>
          <Route path={`/login`} element={<Login/>}/>
          <Route path={`/register`} element={<Register/>}/>
          <Route path={'/*'} element={<Pnf/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App