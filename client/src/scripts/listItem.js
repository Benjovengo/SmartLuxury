//import { useEffect, useState } from 'react';
import { ethers } from 'ethers';


// Import ABI
import FashionToken from '../abis/FashionToken.json'
import SellingContract from '../abis/SellingContract.json'
import Contacts from '../abis/Contacts.json'
import config from '../config.json'; // config - contract address

export const sellItem = async (_tokenURI, _serialNumber) => {

  // Setup provider and network
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  const network = await provider.getNetwork()

  // get signer
  const signer = provider.getSigner();

  // Javascript "version" of the contact smart contract
  const fashionToken = new ethers.Contract(config[network.chainId].fashionToken.address, FashionToken, provider)
  const sellingContract = new ethers.Contract(config[network.chainId].sellingContract.address, SellingContract, provider)
  const contacts = new ethers.Contract(config[network.chainId].contacts.address, Contacts, signer)

   // Mint New Item
  let transaction = await sellingContract.connect(signer).register(_tokenURI, _serialNumber)
  await transaction.wait()

}
