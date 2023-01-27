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

#### `list(uint256 _nftID, uint256 _purchasePrice)`

Lists a product for sale.

##### Parameters

- `_nftID` (uint256): the id of the product/NFT that is put to sale.
- `_purchasePrice` (uint256): the purchase price of the item.

##### Scope

- `public payable`
- Only the owner(seller) can call this function.

##### Returns

- `none`

##### Usage

This function can be called as follows:

```
sellingContract.list(id, purchasePrice)
```

- where `id` is an unsigned integer (for example, 15) representing the token id
- where `purchasePrice` is an unsigned integer (for example, 105) representing the price of the item in _hundredths of ETH_

##### Notes

After the completio of the listing operation, an event the event `productListed(true)` is emitted.

#### `approveTransfer(uint256 _nftID)`

Approve the transfer of the product ownership (ERC-721 token) from the owner to the Selling contract.

##### Parameters

- `_nftID` (uint256): id of the product/NFT.

##### Scope

- `public`

##### Returns

- `none`

##### Usage

This function can be called as follows:

```
sellingContract.approveTransfer(id);
```

- where `id` is an unsigned integer (for example, 15) representing the token id.

##### Notes

It is necessary to approve the transfer before actually transferring it.

#### `unlist(uint256 _nftID)`

Unlists a product for sale.

- after this, the product is not available for sale.

##### Parameters

- `_nftID` (uint256): id of the product/NFT.

##### Scope

- `public`
- Only the owner can call this function.

##### Returns

- `none`

##### Usage

This function can be called as follows:

```
sellingContract.unlist(id);
```

- where `id` is an unsigned integer (for example, 15) representing the token id.

##### Notes

After the completio of the listing operation, an event the event `productUnlisted(true)` is emitted.

#### `depositEarnest(uint256 _nftID)`

Transfer ether to this contract.

##### Parameters

- `_nftID` (uint256): id of the product/NFT.
- the amount transfered is defined in `msg.value`

##### Scope

- `public payable`

##### Returns

- `none`

##### Usage

This function can be called as follows:

```
sellingContract.depositEarnest(id, { value: purchasePrice * (10**16) })
```

- where `id` is an unsigned integer (for example, 15) representing the token id.
- where `purchasePrice` is an unsigned integer (for example, 105) representing the price of the item in _hundredths of ETH_

#### `updateDeliveryStatus(uint256 _nftID, bool _delivered)`

Marks the tracking status as true, meaning that the product has been delivered.

##### Parameters

- `_nftID` (uint256): id of the product/NFT.
- `_delivered` (bool): status of the delivery (true: delivered; false: not delivered yet).

##### Scope

- `public`
- Only an authorized verifier can call this function.

##### Returns

- `none`

##### Usage

This function can be called as follows:

```
sellingContract.updateDeliveryStatus(id, deliveryStatus)
```

- where `id` is an unsigned integer (for example, 15) representing the token id,
- and `deliveryStatus` checks if the product has been delivered or not.

##### Notes

Once the product has been delivered and the sale is finalized, this function is used to mark the product as not delivered in order guarantee that the product will be delivered on a future sale.
