import { ethers } from 'ethers';


// Import ABIs
import FashionToken from '../../abis/FashionToken.json'
import SellingEscrow from '../../abis/SellingEscrow.json'
import Contacts from '../../abis/Contacts.json'
import config from '../../config.json'; // config


/* TEST IMAGES */
import ava01 from "../images/ava-01.png";
import ava02 from "../images/ava-02.png";
import ava03 from "../images/ava-03.png";
import ava04 from "../images/ava-04.png";
import ava05 from "../images/ava-05.png";
import ava06 from "../images/ava-06.png";


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

async function getData() {
  const userId = await contacts.customerId(accounts[0])
  const customer = await contacts.customers(userId) 

  let productList = await loadMetadata()
  let json
  let formatJson
  let data = []
  let productID
  for(let i=0; i < productList.length; i++){
    json = await productList[i]
    productID = Number(json.id)
    if (await sellingEscrow.isListed(productID)) {
      formatJson = {
        id: json.id,
        title: json.name,
        description: json.description,
        imgUrl: json.image[0],
        creator: await fashionToken.ownerOf(productID),
        firstname: customer[1],
        lastname: customer[2],
        creatorImg: "../images/ava-01.png",
        currentBid: Number(await sellingEscrow.purchasePrice(productID))/100,
        category: json.attributes[0].value
      }
      console.log('Index: ', json.id, ' -- Price: ', Number(await sellingEscrow.purchasePrice(productID)))
      data.push(formatJson)
    }
  }
  return data
}




/** DATA
 * get metadata for the products from the blockchain
 */
export const NFT__DATA = await getData()
export const refreshProducts = async () => {
  let resultData = await getData()
  return resultData
}




/** SELLER DATA
 * get contacts info
 */
export const SELLER__DATA = [
  {
    id: "01",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia",
    sellerName: "Ryan Carder",
    sellerImg: ava01,
    currentBid: 5.89,
    fbUrl: "#",
    instaUrl: "#",
    twitUrl: "#",
  },

  {
    id: "02",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia",
    sellerName: "Trista Francis",
    sellerImg: ava02,
    currentBid: 5.89,
    fbUrl: "#",
    instaUrl: "#",
    twitUrl: "#",
  },

  {
    id: "03",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia",
    sellerName: "Ryan Carder",
    sellerImg: ava03,
    currentBid: 5.89,
    fbUrl: "#",
    instaUrl: "#",
    twitUrl: "#",
  },

  {
    id: "04",

    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia",

    sellerName: "Ryan Carder",
    sellerImg: ava04,
    currentBid: 5.89,
    fbUrl: "#",
    instaUrl: "#",
    twitUrl: "#",
  },

  {
    id: "05",

    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia",

    sellerName: "Trista Francis",
    sellerImg: ava05,
    currentBid: 5.89,
    fbUrl: "#",
    instaUrl: "#",
    twitUrl: "#",
  },

  {
    id: "06",

    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia",

    sellerName: "Trista Francis",
    sellerImg: ava06,
    currentBid: 5.89,
    fbUrl: "#",
    instaUrl: "#",
    twitUrl: "#",
  },
];