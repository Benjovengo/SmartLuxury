import { ethers } from 'ethers';


// Import ABI
import Contacts from '../abis/Contacts.json'
import config from '../config.json'; // config - contract address

export const addAccount = async (_firstName, _lastName, _avatar, _email, _physicalAddress, _poBox) => {

  // Setup provider and network
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  const network = await provider.getNetwork()

  // get signer
  const signer = provider.getSigner();

  // Javascript "version" of the contact smart contract
  const contacts = new ethers.Contract(config[network.chainId].contacts.address, Contacts, signer)

  // add account
  await contacts.addAccount(_firstName, _lastName, _avatar, _email, _physicalAddress, _poBox)
  console.log(_avatar)
}


