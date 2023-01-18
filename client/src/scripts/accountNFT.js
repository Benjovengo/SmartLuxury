import { ethers } from 'ethers';


/* Contract */
import Contacts from '../abis/Contacts.json' // Import ABI
import config from '../../config.json'; // config


// Setup provider and network
let provider = new ethers.providers.Web3Provider(window.ethereum)
const network = await provider.getNetwork()

// Javascript "version" of the smart contracts
const contacts = new ethers.Contract(config[network.chainId].contacts.address, Contacts, provider)
const totalProducts = await contacts.totalProductsOwned()
const tokensList = await contacts.getOwned()

/* Function
  Load metadata from deployed contract
*/
const loadTokens = async () => {

  const products = []

  for (var i = 1; i <= totalProducts; i++) {
    let tokenID = tokensList[i]
    products.push(tokenID)
  }
  return products

}

async function getBlockchainData() {
  let productList = await loadTokens()
  return productList
}

export const PRODUCTS__OWNED = await getBlockchainData()
console.log(PRODUCTS__OWNED)