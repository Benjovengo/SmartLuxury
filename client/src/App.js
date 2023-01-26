import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

//import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout'

// Import ABIs
//import FashionToken from './abis/FashionToken.json'
//import SellingContract from './abis/SellingContract.json'
//import trackingOracle from './abis/TrackingOracle.json'
// config
//import config from './config.json';


function App() {

  let [provider, setProvider] = useState(null)
  //let [sellingContract, setEscrow] = useState(null)
  let [account, setAccount] = useState(null)
  //let [products, setProducts] = useState([])
  //let [product, setProduct] = useState({})
  //let [toggle, setToggle] = useState(false);

  const loadBlockchainData = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAccount(accounts[0])

    window.ethereum.on('accountsChanged', async () => {
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])


  return (
    <Layout account={account} setAccount={setAccount} />
  );
}

export default App;
