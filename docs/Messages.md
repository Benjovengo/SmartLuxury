### Messages Smart Contract

#### State Variables

- `owner` (address)
- `numberOfUsers` (uint256)
- `Message` (struct)
  - `ethAccount` (address)
  - `name` (string)
  - `email` (string)
  - `subject` (string)
  - `body` (string)
- `allMessages` (mapping: message id => Message struct)
- `isNew` (mapping: message id => is new message or not)
- `messengerId` (mapping: sender's address => sender's id)

#### Events

#### Functions

Before using these functions, the smart contract needs to deployed to a Hardhat node or to a testnet (it is not recommended to use any of the code from this project on a real project - it is not production ready!). After starting the node, run

```
const Messages = await ethers.getContractFactory('Messages')
messages = await Messages.deploy()
```

or using _ethers.js_ on the client-side:

```
import { ethers } from 'ethers';

import Messages from 'path/to/ABI/Messages.json' // ABI for the smart contract
import 'path/to/config.json' // config file with the address of the deployed smart contract

let provider = new ethers.providers.Web3Provider(window.ethereum, "any")
const network = await provider.getNetwork()
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
const signer = provider.getSigner();

const messages = new ethers.Contract(config[network.chainId].messages.address, Messages, signer)
```
