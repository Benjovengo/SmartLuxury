import { useEffect } from 'react';
import { ethers } from 'ethers';


// Import ABI
import Contacts from '../abis/Contacts.json'
import config from '../config.json'; // config - contract address


const loadCustomerData = async () => {
   // Setup provider and network
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  const network = await provider.getNetwork()

  // get MetaMask signer
  const signer = provider.getSigner();
  
  // Javascript "version" of the contact smart contract
  const contacts = new ethers.Contract(config[network.chainId].contacts.address, Contacts, signer)

  let customerData = await contacts.getCustomerInfo(signer.getAddress())
  // console.log(customerData)
  // return await contacts.getCustomerInfo(signer.getAddress())

  return customerData

}

export const getCustomerData = loadCustomerData()