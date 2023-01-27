### ShippingInfo Smart Contract

#### State Variables

- `owner` (address)
- `delivered` (mapping: buyer's address => (mapping: product id => delivered status))
- `buyer` (mapping: seller's address => (mapping: product id => buyer's address))

Calling other contracts

- `fashionToken` (FashionToken)
  - import the contract before using this declaration
  - outside of the Selling contract, add `import "./path/to/ABI/FashionToken.sol";`
- `sellingContract` (SellingContract)
  - import the contract before using this declaration
  - outside of the Selling contract, add `import "./path/to/ABI/SellingContract.sol";`
- `verifiedContract` (VerifiedContacts)
  - import the contract before using this declaration
  - outside of the Selling contract, add `import "./path/to/ABI/VerifiedContacts.sol";`

#### Events

- `productDelivered(address _buyerAddress, uint256 _nftID, bool _deliveredStatus);`
- `inPersonSaleEvent(address _buyerAddress, uint256 _nftID, bool _isPresentialSale);`

#### Functions

Before using these functions, the smart contract needs to deployed to a Hardhat node or to a testnet (it is not recommended to use any of the code from this project on a real project - it is not production ready!). After starting the node, run

```
const FashionToken = await ethers.getContractFactory('FashionToken')
fashionToken = await FashionToken.deploy()
const VerifiedContacts = await ethers.getContractFactory('VerifiedContacts')
verifiedContract = await VerifiedContacts.deploy()

const ShipmentInfo = await ethers.getContractFactory('ShipmentInfo')
shipmentInfo = await ShipmentInfo.deploy()
```

or using _ethers.js_ on the client-side:

```
import { ethers } from 'ethers';

import FashionToken from 'path/to/ABI/FashionToken.json' // ABI for the smart contract
import VerifiedContacts from 'path/to/ABI/VerifiedContacts.json' // ABI for the smart contract
import 'path/to/config.json' // config file with the address of the deployed smart contract

let provider = new ethers.providers.Web3Provider(window.ethereum, "any")
const network = await provider.getNetwork()
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
const signer = provider.getSigner();

const verifiedContracts = new ethers.Contract(config[network.chainId].verifiedContracts.address, VerifiedContracts, signer)
```
