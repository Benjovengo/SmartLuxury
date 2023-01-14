import React from 'react'
import Routers from '../../routes/Routers'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
//import Search from '../Search/Search'

const Layout = ({ account, setAccount }) => {

  return (
    <>
      <Header account={account} setAccount={setAccount}/>
      {/* <Search/> */}
      <div>
        <Routers/>
      </div>
      <Footer/>
    </>
  )
}

export default Layout