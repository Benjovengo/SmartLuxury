import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

//import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout'

// Import ABIs
import FashionToken from './abis/FashionToken.json'
import SellingEscrow from './abis/SellingEscrow.json'
//import trackingOracle from './abis/TrackingOracle.json'
// config
import config from './config.json';


function App() {

  const [provider, setProvider] = useState(null)
  const [sellingEscrow, setEscrow] = useState(null)
  const [account, setAccount] = useState(null)
  const [homes, setHomes] = useState([])
  const [home, setHome] = useState({})
  const [toggle, setToggle] = useState(false);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAccount(accounts[0])
    setProvider(provider)

    const network = await provider.getNetwork()
    console.log(config[network.chainId].fashionToken.address)
    
    /*const fashionToken = new ethers.Contract(config[network.chainId].fashionToken.address, FashionToken, provider)
    const totalSupply = await fashionToken.totalSupply()
    const homes = []*/

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
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
