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
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({})
  const [toggle, setToggle] = useState(false);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    //const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    //setAccount(accounts[0])
    setProvider(provider)
    const network = await provider.getNetwork()

    // Javascript "version" of the smart contracts
    // to interact with via Javascript
    const fashionToken = new ethers.Contract(config[network.chainId].fashionToken.address, FashionToken, provider)
    //const fashionToken = new ethers.Contract(config[network.chainId].fashionToken.address, FashionToken, provider)
    const sellingEscrow = new ethers.Contract(config[network.chainId].sellingEscrow.address, SellingEscrow, provider)

    const totalSupply = await fashionToken.totalSupply()
    console.log(totalSupply)


    

    //const fashionToken = new ethers.Contract(config[network.chainId].fashionToken.address, FashionToken, provider)
    
    //const realEstate = new ethers.Contract(config[network.chainId].realEstate.address, RealEstate, provider)
    //const totalSupply = await fashionToken.totalSupply()
    //const products = []
    
    /*const products = []*/

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
