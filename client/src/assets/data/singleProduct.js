import { ethers } from 'ethers';


// Import ABIs
import FashionToken from '../../abis/FashionToken.json'
import SellingEscrow from '../../abis/SellingEscrow.json'
import Contacts from '../../abis/Contacts.json'
import config from '../../config.json'; // config


/* Get info for products */

// Setup provider and network
let provider = new ethers.providers.Web3Provider(window.ethereum)
const network = await provider.getNetwork()
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
// get signer
const signer = provider.getSigner();

// Javascript "version" of the smart contracts
// to interact with via Javascript
const fashionToken = new ethers.Contract(config[network.chainId].fashionToken.address, FashionToken, signer)
const totalSupply = await fashionToken.totalSupply()

const sellingEscrow = new ethers.Contract(config[network.chainId].sellingEscrow.address, SellingEscrow, signer)
const contacts = new ethers.Contract(config[network.chainId].contacts.address, Contacts, signer)


/* LOAD METADATA FUNCTIONS
  Load metadata from deployed contract
*/
const loadMetadata = async () => {

  const products = []

  for (var i = 1; i <= Number(totalSupply); i++) {
    const uri = await fashionToken.tokenURI(i)
    const response = await fetch(uri)
    const metadata = await response.json()
    products.push(metadata)
  }
  return products
}

async function getData(_nftID) {
  let userId = await contacts.customerId(accounts[0])
  let customer = await contacts.customers(userId)

  let productList = await loadMetadata()
  let json
  let data
  let productID
  let isListed
  let currentOwner
  for(let i=0; i < productList.length; i++){
    json = await productList[i]
    productID = Number(await fashionToken.getProductID(json.SKU))
    currentOwner = String(await fashionToken.getOwnershipOf(productID))
    isListed = await sellingEscrow.isListed(productID)
    // has to be listed or owned by who wants to see it
    // AND gets only one item at a time based on the ID
    if ((isListed || currentOwner === accounts[0]) && _nftID === productID) {
      //if (_nftID === productID) {
      userId = await contacts.customerId(currentOwner)
      customer = await contacts.customers(userId)
      data = {
        id: productID,
        title: json.name,
        description: json.description,
        imgUrl: json.image[0],
        creator: await fashionToken.getFirstOwner(productID),
        firstname: customer[1],
        lastname: customer[2],
        creatorImg: customer[3],
        currentBid: Number(await sellingEscrow.purchasePrice(productID))/100,
        category: json.attributes[0].value
      }
      console.log('SINGLE PRODUCT DEBUG -------------------')
      console.log('Argument:  ', _nftID)
      console.log('Product ID ', productID)
      console.log('ID Token   ', Number(await fashionToken.getProductID(json.SKU)))
      console.log('----------------------------------------')
    }
  }
  return data
}




/** DATA - EXPORT METADATA
 * get metadata for the products from the blockchain
 */

export const refreshProducts = async (_nftID) => {
  let resultData = await getData(_nftID)
  return resultData
}






/** SELLER DATA
 * get contacts info
 */

/* LOAD METADATA FUNCTIONS
  Load metadata from deployed contract
*/
const loadAccountsInfo = async () => {

  const contactsInfo = []
  const numberOfContacts = Number(await contacts.numberOfCustomers())


  //(let i = 0; i < (arr.length >= 4 ? 4 : arr.length)
  //(let i = numberOfContacts; i > (numberOfContacts >= 4? numberOfContacts-4 : 1, i--)
  for (let i = numberOfContacts; i >= (numberOfContacts >= 4? numberOfContacts-4 : 1); i--) {
    let data = await contacts.customers(i)
    let fetchedUser = {
      id: i,
      firstname: data.firstName,
      lastname: data.lastName,
      sellerName: data.firstName + ' ' + data.lastName,
      sellerImg: data.avatar,
      currentBid: 5.12,
      address: data.ethAccount
    }
    contactsInfo.push(fetchedUser)
  }
  return contactsInfo
}



/** DATA - EXPORT CONTACTS
 * get accounts info from the blockchain
 */
export const SELLER__DATA = await loadAccountsInfo()
 