import { ethers } from 'ethers';

/* Contract */
import Messages from '../abis/Messages.json' // messages contract
import config from '../config.json'; // config


  // Setup provider and network
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  const network = await provider.getNetwork()
  // get signer
  const signer = provider.getSigner();
  //console.log("Account:", await signer.getAddress());

  // Javascript "version" of the contact smart contract
  const messages = new ethers.Contract(config[network.chainId].messages.address, Messages, signer)


/** Create a new message */
export const newMessage = async (_name, _email, _subject, _body) => {
  // add message
  await messages.addMessage(_name, _email, _subject, _body)
}


/** Get messages */
export const myMessages = async () => {
  const numberOfSenders = Number(await messages.numberOfUsers())
  let messageSent = await messages.getMessages(1)
  console.log(Number(numberOfSenders))
  console.log(messageSent)
  console.log(await messages.allMessages(1))
}