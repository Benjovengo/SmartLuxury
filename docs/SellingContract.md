### Selling Smart Contract

#### State Variables

- `nftAddress` (address)
- `seller` (address payable)
- `verifier` (address)
- `contacts` (address)
- `fee` (uint256)

  - the fee is defined as a percentage of the product price

- `isListed` (mapping: product id => is listed or not)
- `purchasePrice` (mapping: product id => price)
- `deposit` (mapping: buyer's address => (mapping: product id => amount transferred to this contract))
- `buyer` (mapping: product id => buyer's address)
- `nftSeller` (mapping: product id => seller's address)
- `wasDelivered` (mapping: product id => is delireved bool status)
- `approval` (mapping: product id => (mapping: verifier's address => approve sale or not ))

Calling other contracts

- `fashionToken` (FashionToken)
  - import the contract before using this declaration
  - outside of the Selling contract, add `import "./path/to/ABI/FashionToken.sol";`
- `contactContract` (Contacts)
  - import the contract before using this declaration
  - outside of the Selling contract, add `import "./path/to/ABI/Contacts.sol";`

#### Events

- `productRegistered(address owner, uint256 regItem)`
- `productListed(bool listed)`
- `productUnlisted(bool unlisted)`
- `saleFinalized(bool sale)`

#### Functions

Before using these functions, the smart contract needs to deployed to a Hardhat node or to a testnet (it is not recommended to use any of the code from this project on a real project - it is not production ready!). After starting the node, run

```
const SellingContract = await ethers.getContractFactory('SellingContract')
sellingContract = await SellingContract.deploy()
```

or using _ethers.js_ on the client-side:

```
import { ethers } from 'ethers';

import SellingContract from 'path/to/ABI/SellingContract.json' // ABI for the smart contract
import 'path/to/config.json' // config file with the address of the deployed smart contract

let provider = new ethers.providers.Web3Provider(window.ethereum, "any")
const network = await provider.getNetwork()
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
const signer = provider.getSigner();

const sellingContract = new ethers.Contract(config[network.chainId].sellingContract.address, SellingContract, signer)
```
