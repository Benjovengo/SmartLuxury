import { ethers } from 'ethers';

// Import ABI
import Contacts from '../abis/Contacts.json'
// config
import config from '../config.json';

// Setup provider and network
let provider = new ethers.providers.Web3Provider(window.ethereum)
const network = await provider.getNetwork()

// Javascript "version" of the contact smart contract
const contacts = new ethers.Contract(config[network.chainId].contacts.address, Contacts, provider)

