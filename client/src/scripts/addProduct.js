import { ethers } from 'ethers';


/* Contract */
import SellingEscrow from '../abis/SellingEscrow.json'
import config from '../config.json'; // config

export const registerProduct = async (_tokenURI, _serialNumber) => {

  // Setup provider and network
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  const network = await provider.getNetwork()

  // get signer
  const signer = provider.getSigner();

  // Javascript "version" of the contact smart contract
  const sellingEscrow = new ethers.Contract(config[network.chainId].sellingEscrow.address, SellingEscrow, signer)

  // add account
  await sellingEscrow.register(_tokenURI, _serialNumber)
}