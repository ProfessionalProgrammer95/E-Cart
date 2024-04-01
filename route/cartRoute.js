const cartRoute = require('express').Router()
const {createCart, allCart, singleCart, updateCart,deleteCart} = require('../controller/cartCtrl')
const auth = require('../middleware/auth')

cartRoute.get(`/all`,auth, allCart)
cartRoute.get(`/single/:id`,auth, singleCart)

cartRoute.post(`/add`,auth,createCart)
cartRoute.patch(`/update/:id`,auth, updateCart)
cartRoute.delete(`/delete/:id`,auth,deleteCart)

module.exports =cartRoute