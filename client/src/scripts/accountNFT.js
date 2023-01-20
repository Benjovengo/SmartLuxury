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
const fashionToken = new ethers.Contract(config[network.chainId].fashionToken.address, FashionToken, provider)
const contacts = new ethers.Contract(config[network.chainId].contacts.address, Contacts, signer)

// DEBUG
//await contacts.addCustomerItems(accounts[0], 5)
//await contacts.addCustomerItems(accounts[0], 5)
// DEBUG END

const totalTokens = await contacts.totalProductsOwned(accounts[0])
const ownedTokens = await contacts.getOwned(accounts[0])


/* FUNCTION: loadTokens
  Load token IDs owned by tha contract
*/
const loadTokens = async () => {

  const products = []

  for (var i = 0; i < totalTokens; i++) {
    let tokenID = ownedTokens[i]
    const uri = await fashionToken.tokenURI(tokenID)
    const response = await fetch(uri)
    const metadata = await response.json()
    products.push(metadata)
  }
  return products

}

async function getBlockchainData() {
  let productList = await loadTokens()
  let json
  let formatJson
  let data = []
  for(let i=0; i < productList.length; i++){
      json = await productList[i]
      formatJson = {
        id: json.id,
        title: json.name,
        description: json.description,
        imgUrl: json.image[0],
        creator: await fashionToken.ownerOf(i+1),
        creatorImg: "../images/ava-01.png",
        currentBid: 100
      }
      data.push(formatJson)    
  }
  console.log('Got data from blockchain.')
  return data
}

export const PRODUCTS__OWNED__FILE = await getBlockchainData()
export const accountData = async () => {
  return await getBlockchainData()
}
//console.log(PRODUCTS__OWNED)