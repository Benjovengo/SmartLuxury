import { ethers } from 'ethers';


/* Contract */
import FashionToken from '../abis/FashionToken.json'

import Contacts from '../abis/Contacts.json' // Import ABI
import config from '../config.json'; // config


let provider = new ethers.providers.Web3Provider(window.ethereum, "any")
const network = await provider.getNetwork()

const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

// get signer
const signer = provider.getSigner();


// Javascript "version" of the smart contracts
const contacts = new ethers.Contract(config[network.chainId].contacts.address, Contacts, signer)

// DEBUG
await contacts.addCustomerItems(accounts[0], 5)
await contacts.addCustomerItems(accounts[0], 5)
// DEBUG END

const totalTokens = await contacts.totalProductsOwned(accounts[0])
const ownedTokens = await contacts.getOwned(accounts[0])


/* Function
  Load metadata from deployed contract
*/
const loadTokens = async () => {

  const products = []

  for (var i = 0; i < totalTokens; i++) {
    let tokenID = ownedTokens[i]
    products.push(Number(tokenID))
  }
  return products

}

async function getBlockchainData() {
  let productList = await loadTokens()
  console.log(productList)
  return productList
}

export const PRODUCTS__OWNED = await getBlockchainData()
//console.log(PRODUCTS__OWNED)