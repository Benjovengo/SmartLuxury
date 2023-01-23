import { ethers } from 'ethers';


/* Contracts */
import FashionToken from '../abis/FashionToken.json'
import config from '../config.json'; // config

/** Setup connection to the smart contracts */
let provider = new ethers.providers.Web3Provider(window.ethereum, "any")
const network = await provider.getNetwork()
// get signer
const signer = provider.getSigner();

// Javascript "version" of the smart contracts
const fashionToken = new ethers.Contract(config[network.chainId].fashionToken.address, FashionToken, signer)

/** Get the list of owners for a particular item */
export const getOwnersList = async (_nftID) => {

  const numberOfOwners = await fashionToken.numberOfOwners(_nftID)
  let previousOwner
  let owners = []

  for (let i = numberOfOwners; i > 0; i--){
    previousOwner = await fashionToken.getOwner(_nftID, i)
    owners.push(previousOwner)
  }

  return owners

}

/** Get the first owner of a product */
export const getFirstOwner = async (_nftID) => {
  return await fashionToken.firstOwner(_nftID)
}
