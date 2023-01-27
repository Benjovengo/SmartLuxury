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

#### `constructor(address _nftAddress, address _contacts, address _verifier)`

Constructor method.

- sets up the addresses and contracts associations.

##### Parameters

- `_nftAddress` (address): address of the FashionToken contract.
- `_contacts` (address): address of the Contacts contract.
- `_verifier` (address): address of the verifier.

##### Scope

- `none`

##### Returns

- `none`

##### Usage

Called during the deployment process.

#### `register(string memory _tokenURI, string memory _serialNumber)`

Adds a new product to have its ownership tracked.

##### Parameters

- `_tokenURI` (string memory): description
- `_serialNumber` (string memory): description

##### Scope

- `public`

##### Returns

- `none`

##### Usage

This function can be called as follows:

```
sellingContract.register('https://link.to/metadata/token.uri', 'SerialNumber')
```

##### Notes

- Checks if the serial number has already been registered before adding a new product.

#### `function onERC721Received(address, address, uint256, bytes calldata)`

Receive confirmation for ERC-721 token.

- Called upon a safe transfer.

##### Parameters

- (address): "operator" - the address of the account that is calling the function and sending the token.
- (address): "from" - the address of the account that the token is being transferred from.
- (uint256): "tokenId" - the unique ID of the ERC721 token being transferred.

##### Scope

- `external pure`

##### Returns

- `bytes4` - IERC721Receiver.onERC721Received.selector. The selector is the first 4 bytes of the SHA-3 hash of the signature of the function which is used to identify the function when the transaction is sent to the contract.

##### Usage

Called upon a safe transfer.
