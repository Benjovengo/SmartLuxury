import { ethers } from 'ethers';


/* Contracts */
import FashionToken from '../abis/FashionToken.json' // Import token ABI
import SellingEscrow from '../abis/SellingEscrow.json' // Import Selling contract ABI
import Contacts from '../abis/Contacts.json' // Import Contacts ABI
import config from '../config.json'; // Config - addresses


let provider = new ethers.providers.Web3Provider(window.ethereum, "any")
const network = await provider.getNetwork()

const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

// get signer
const signer = provider.getSigner();


// Javascript "version" of the smart contracts
const fashionToken = new ethers.Contract(config[network.chainId].fashionToken.address, FashionToken, provider)
const sellingEscrow = new ethers.Contract(config[network.chainId].sellingEscrow.address, SellingEscrow, signer)
const contacts = new ethers.Contract(config[network.chainId].contacts.address, Contacts, signer)

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
  const userId = await contacts.customerId(accounts[0])
  const customer = await contacts.customers(userId) 

  let productList = await loadTokens()
  let json
  let formatJson
  let data = []
  let productID
  for(let i=0; i < productList.length; i++){
      json = await productList[i]
      productID = Number(await fashionToken.getProductID(json.SKU))
      formatJson = {
        id: productID,
        title: json.name,
        description: json.description,
        imgUrl: json.image[0],
        creator: await fashionToken.ownerOf(i+1),
        firstname: customer[1],
        lastname: customer[2],
        creatorImg: "../images/ava-01.png",
        currentBid: 100,
        category: json.attributes[0].value,
        isListed: await sellingEscrow.isListed(productID)
      }
      data.push(formatJson)    
  }
  console.log('Got data from blockchain.')
  return data
}


/** Export Data
 * 
 */

export const PRODUCTS__OWNED__FILE = await getBlockchainData()
export const accountData = async () => {
  return await getBlockchainData()
}