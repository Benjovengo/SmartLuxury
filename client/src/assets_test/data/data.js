import { ethers } from 'ethers';


// Import ABIs
import FashionToken from '../../abis/FashionToken.json'
import SellingEscrow from '../../abis/SellingEscrow.json'

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

// Javascript "version" of the smart contracts
// to interact with via Javascript
const fashionToken = new ethers.Contract(config[network.chainId].fashionToken.address, FashionToken, provider)
const totalSupply = await fashionToken.totalSupply()

const sellingEscrow = new ethers.Contract(config[network.chainId].sellingEscrow.address, SellingEscrow, provider)


/* Function
  Load metadata from deployed contract
*/
const loadMetadata = async () => {

  const products = []

  for (var i = 1; i <= totalSupply; i++) {
    const uri = await fashionToken.tokenURI(i)
    const response = await fetch(uri)
    const metadata = await response.json()
    products.push(metadata)
  }
  return products

}

async function getData() {
  let productList = await loadMetadata()
  let json
  let formatJson
  let data = []
  for(let i=0; i < productList.length; i++){
    //console.log(i+1, await sellingEscrow.isListed(i+1)) // DEBUG
    if (await sellingEscrow.isListed(i+1)) {
      json = await productList[i]
      formatJson = {
        id: json.id,
        title: json.name,
        description: json.description,
        imgUrl: json.image[0],
        creator: await fashionToken.ownerOf(i+1),
        creatorImg: "../images/ava-01.png",
        currentBid: (Number(await sellingEscrow.purchasePrice(i+1)))/100,
        category: json.attributes[0].value
      }
      data.push(formatJson)
    }
    
  }
  return data
}

export const NFT__DATA = await getData()
export const refreshProducts = async () => {
  let resultData = await getData()
  console.log('data script')
  console.log(resultData)
  return resultData
}
//console.log(NFT__DATA)


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