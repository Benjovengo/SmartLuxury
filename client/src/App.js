import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

//import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout'

// Import ABIs
import fashionToken from './abis/FashionToken.json'
import sellingEscrow from './abis/SellingEscrow.json'
//import trackingOracle from './abis/TrackingOracle.json'
// config
import config from './config.json';


function App() {


  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log(provider)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <Layout/>
  );
}

export default App;
