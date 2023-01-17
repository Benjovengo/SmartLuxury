import { ethers } from 'ethers';


// Import ABI
import Contacts from '../abis/Contacts.json'
import config from '../config.json'; // config - contract address

export const getAccountInfo = async () => {

  // Setup provider and network
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  const network = await provider.getNetwork()

  // get signer
  const signer = provider.getSigner();

  // Javascript "version" of the contact smart contract
  const contacts = new ethers.Contract(config[network.chainId].contacts.address, Contacts, signer)

  // add account
  console.log(await contacts.getCustomerInfo(signer.getAddress()))
  return await contacts.getCustomerInfo(signer.getAddress())
}
