import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// import pages
import Contact from '../components/Contact'
import EditProfile from '../components/EditProfile'
import Home from '../components/Home'
import ListItem from '../components/ListItem'
import Market from '../components/Market'
import Navigation from '../components/Navigation'
import ProductNFTDetails from '../components/ProductNFTDetails'
import Search from '../components/Search'
import SellerProfile from '../components/SellerProfile'
import Wallet from '../components/Wallet'


const Routers = () => {
  return (<Routes>
    <Route path='/' element={<Navigate to='/home' />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/editProfile' element={<EditProfile />} />
    <Route path='/home' element={<Home />} />
    <Route path='/listItem' element={<ListItem />} />
    <Route path='/market' element={<Market />} />
    <Route path='/search' element={<Search />} />
    <Route path='/sellerProfile' element={<SellerProfile />} />
    <Route path='/wallet' element={<Wallet />} />

    <Route path='/market/:id' element={<ProductNFTDetails />} />
  </Routes>
  )
}


export default Routers