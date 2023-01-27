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

```solidity
const FashionToken = await ethers.getContractFactory('FashionToken')
fashionToken = await FashionToken.deploy()
const Contacts = await ethers.getContractFactory('Contacts')
contactsContract = await Contacts.deploy()

const SellingContract = await ethers.getContractFactory('SellingContract')
sellingContract = await SellingContract.deploy()
```

or using _ethers.js_ on the client-side:

```solidity
import { ethers } from 'ethers';

import FashionToken from 'path/to/ABI/FashionToken.json' // ABI for the smart contract
import Contacts from 'path/to/ABI/Contacts.json' // ABI for the smart contract
import SellingContract from 'path/to/ABI/SellingContract.json' // ABI for the smart contract
import 'path/to/config.json' // config file with the address of the deployed smart contract

let provider = new ethers.providers.Web3Provider(window.ethereum, "any")
const network = await provider.getNetwork()
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
const signer = provider.getSigner();

const fashionToken = new ethers.Contract(config[network.chainId].fashionToken.address, FashionToken, signer)
const contactsContract = new ethers.Contract(config[network.chainId].contactsContract.address, Contacts, signer)
const sellingContract = new ethers.Contract(config[network.chainId].sellingContract.address, SellingContract, signer)
```

#### `constructor(address _nftAddress, address _contacts, address _verifier)`

Constructor method.

- sets up the addresses and contracts associations.

##### Arguments

- `_nftAddress` (address): address of the FashionToken contract.
- `_contacts` (address): address of the Contacts contract.
- `_verifier` (address): address of the verifier.

##### Visibility

- `none`

##### Returns

- `none`

##### Usage

Called during the deployment process.

#### `register(string memory _tokenURI, string memory _serialNumber)`

Adds a new product to have its ownership tracked.

##### Arguments

- `_tokenURI` (string memory): description
- `_serialNumber` (string memory): description

##### Visibility

- `public`

##### Returns

- `none`

##### Usage

This function can be called as follows:

```solidity
sellingContract.register('https://link.to/metadata/token.uri', 'SerialNumber')
```

##### Notes

- Checks if the serial number has already been registered before adding a new product.

#### `function onERC721Received(address, address, uint256, bytes calldata)`

Receive confirmation for ERC-721 token.

- Called upon a safe transfer.

##### Arguments

- (address): "operator" - the address of the account that is calling the function and sending the token.
- (address): "from" - the address of the account that the token is being transferred from.
- (uint256): "tokenId" - the unique ID of the ERC721 token being transferred.

##### Visibility

- `external pure`

##### Returns

- `bytes4` - IERC721Receiver.onERC721Received.selector. The selector is the first 4 bytes of the SHA-3 hash of the signature of the function which is used to identify the function when the transaction is sent to the contract.

##### Usage

Called upon a safe transfer.

#### `list(uint256 _nftID, uint256 _purchasePrice)`

Lists a product for sale.

##### Arguments

- `_nftID` (uint256): the id of the product/NFT that is put to sale.
- `_purchasePrice` (uint256): the purchase price of the item.

##### Visibility

- `public payable`
- Only the owner(seller) can call this function.

##### Returns

- `none`

##### Usage

This function can be called as follows:

```solidity
sellingContract.list(id, purchasePrice)
```

- where `id` is an unsigned integer (for example, 15) representing the token id,
- and `purchasePrice` is an unsigned integer (for example, 105) representing the price of the item in _hundredths of ETH_

##### Notes

After the completio of the listing operation, the event `productListed(true)` is emitted.

#### `approveTransfer(uint256 _nftID)`

Approve the transfer of the product ownership (ERC-721 token) from the owner to the Selling contract.

##### Arguments

- `_nftID` (uint256): id of the product/NFT.

##### Visibility

- `public`

##### Returns

- `none`

##### Usage

This function can be called as follows:

```solidity
sellingContract.approveTransfer(id);
```

- where `id` is an unsigned integer (for example, 15) representing the token id.

##### Notes

It is necessary to approve the transfer before actually transferring it.

#### `unlist(uint256 _nftID)`

Unlists a product for sale.

- after this, the product is not available for sale.

##### Arguments

- `_nftID` (uint256): id of the product/NFT.

##### Visibility

- `public`
- Only the owner can call this function.

##### Returns

- `none`

##### Usage

This function can be called as follows:

```solidity
sellingContract.unlist(id);
```

- where `id` is an unsigned integer (for example, 15) representing the token id.

##### Notes

After the completio of the listing operation, the event `productUnlisted(true)` is emitted.

#### `depositEarnest(uint256 _nftID)`

Transfer ether to this contract.

##### Arguments

- `_nftID` (uint256): id of the product/NFT.
- the amount transfered is defined in `msg.value`

##### Visibility

- `public payable`

##### Returns

- `none`

##### Usage

This function can be called as follows:

```solidity
sellingContract.depositEarnest(id, { value: purchasePrice * (10**16) });
```

- where `id` is an unsigned integer (for example, 15) representing the token id.
- where `purchasePrice` is an unsigned integer (for example, 105) representing the price of the item in _hundredths of ETH_

#### `updateDeliveryStatus(uint256 _nftID, bool _delivered)`

Marks the tracking status as true, meaning that the product has been delivered.

##### Arguments

- `_nftID` (uint256): id of the product/NFT.
- `_delivered` (bool): status of the delivery (true: delivered; false: not delivered yet).

##### Visibility

- `public`
- Only an authorized verifier can call this function.

##### Returns

- `none`

##### Usage

This function can be called as follows:

```solidity
sellingContract.updateDeliveryStatus(id, deliveryStatus);
```

- where `id` is an unsigned integer (for example, 15) representing the token id,
- and `deliveryStatus` checks if the product has been delivered or not.

##### Notes

Once the product has been delivered and the sale is finalized, this function is used to mark the product as not delivered in order guarantee that the product will be delivered on a future sale.

#### `approveSale(uint256 _nftID)`

All the addresses involved in the selling process must approve the sale to finalize it.

##### Arguments

- `_nftID` (uint256): id of the product/NFT.
- Only the addresses involved in that particular selling process can call this function.

##### Visibility

- `public`

##### Returns

- `none`

##### Usage

This function can be called as follows:

```solidity
sellingContract.approveSale(id);
```

- where `id` is an unsigned integer (for example, 15) representing the token id.

#### `finalizeSale(uint256 _nftID)`

Finalize the sale after the following requirements are met:

- Require the appoval of the sale by the addresses involved in the process
- Require delivered status
- Require funds to be correct amount

##### Arguments

- `_nftID` (uint256): id of the product/NFT.

##### Visibility

- `public`

##### Returns

- `none`

##### Usage

This function can be called as follows:

```solidity
sellingContract.finalizeSale(id);
```

- where `id` is an unsigned integer (for example, 15) representing the token id.

##### Notes

Operations:

- Transfer NFT to buyer
- Transfer the amount relative to the price of the item minus the corresponding fee to seller
- Transfer the fee to the deployer

After the completio of the listing operation, the event `saleFinalized(true, true)` is emitted broadcasting that both ether transfers (the amount corresponding to the price to the seller and the fee to the deployer) were successfull.

#### `cancelSale(uint256 _nftID)`

Cancel the sale.

- reverts the transfers of ether by the buyer and the ERC-721 token by the seller.

##### Arguments

- `_nftID` (uint256): id of the product/NFT.
- Only the buyer and the seller can call this function.

##### Visibility

- `public`

##### Returns

- `none`

##### Usage

This function can be called as follows:

```solidity
sellingContract.cancelSale(id);
```

- where `id` is an unsigned integer (for example, 15) representing the token id.

#### `receive()`

Accept ether from other contracts.

- The buyer can use other contracts can sent ether directly to this contract.

##### Arguments

- `none`

##### Visibility

- `external payable`

##### Returns

- `none`

##### Usage

Send ether from other contracts to the Selling contract.

#### `getBalance()`

Returns the balance total of the Selling contract.

- It represents the sum of all transfers from buyers that are currently held by this contract.

##### Arguments

- `none`

##### Visibility

- `public view`

##### Returns

- `uint256`: the amount held by this contract.

##### Usage

This function can be called as follows:

```solidity
sellingContract.getBalance()
```

#### `getSeller(uint256 _nftID)`

Returns the seller of the product/NFT.

##### Arguments

- `_nftID` (uint256): id of the product/NFT.

##### Visibility

- `public view`

##### Returns

- `address`: the address of the seller of a particular product/NFT.

##### Usage

This function can be called as follows:

```solidity
sellingContract.getSeller(id)
```

- where `id` is an unsigned integer (for example, 15) representing the token id.
