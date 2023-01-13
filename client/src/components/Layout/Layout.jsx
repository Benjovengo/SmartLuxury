import React from 'react'
import Routers from '../../routes/Routers'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Layout = ({ account, setAccount }) => {

  return (
    <>
      <Header account={account} setAccount={setAccount}/>
      <div>
        <Routers/>
      </div>
      <Footer/>
    </>
  )
}

export default Layout