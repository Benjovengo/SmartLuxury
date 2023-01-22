import { ethers } from 'ethers';

/* Contract */
import Messages from '../abis/Messages.json' // messages contract
import config from '../config.json'; // config

/* Register new product */
export const newMessage = async (_name, _email, _subject, _body) => {
  // Setup provider and network
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  const network = await provider.getNetwork()
  // get signer
  const signer = provider.getSigner();
  //console.log("Account:", await signer.getAddress());

  // Javascript "version" of the contact smart contract
  const messages = new ethers.Contract(config[network.chainId].messages.address, Messages, signer)

  // add message
  await messages.addMessage(_name, _email, _subject, _body)
}
