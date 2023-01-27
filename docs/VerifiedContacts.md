### VerifiedContacts Smart Contract

#### State Variables

- `totalCustomers` (Counter)
- `owner` (address)
- `userId` (uint256)
- `numberOfCustomers` (uint256)
- `Customer` (struct)
  - `ethAccount` (address)
  - `firstName` (string)
  - `lastName` (string)
  - `avatar` (string)
  - `email` (string)
  - `physicalAddress` (string)
  - `poBox` (uint256)
- `customers` (mapping: customer's ID => Customer)
- `customerId` (mapping: customer's address => customer ID)
- `totalProductsOwned` (mapping: customer's address => number of products owned)
- `ownedProducts` (mapping: customer's address => array of product IDs owned by the customer)
- `isOwned` (mapping: customer's address => mapping: product ID => is owned by the customer or not)
- `tokenIds` (array of uint256)

#### Events

#### Functions

Before using these functions, the smart contract needs to deployed to a Hardhat node or to a testnet (it is not recommended to use any of the code from this project on a real project - it is not production ready!). After starting the node, run

```
const VerifiedContacts = await ethers.getContractFactory('VerifiedContacts')
verifiedContacts = await VerifiedContacts.deploy()
```

or using _ethers.js_ on the client-side:

```
import { ethers } from 'ethers';

import VerifiedContacts from 'path/to/ABI/VerifiedContacts.json' // ABI for the smart contract
import 'path/to/config.json' // config file with the address of the deployed smart contract

let provider = new ethers.providers.Web3Provider(window.ethereum, "any")
const network = await provider.getNetwork()
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
const signer = provider.getSigner();

vonst VerifiedContacts = new ethers.Contract(config[network.chainId].VerifiedContacts.address, VerifiedContacts, signer)
```
