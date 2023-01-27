### ShippingInfo Smart Contract

#### State Variables

- `owner` (address)
- `delivered` (mapping: buyer's address => (mapping: product id => delivered status))
- `inPerson` (mapping: buyer's address => (mapping: product id => delivered status))
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

```javascript
const FashionToken = await ethers.getContractFactory("FashionToken");
fashionToken = await FashionToken.deploy();
const VerifiedContacts = await ethers.getContractFactory("VerifiedContacts");
verifiedContract = await VerifiedContacts.deploy();

const ShipmentInfo = await ethers.getContractFactory("ShipmentInfo");
shipmentInfo = await ShipmentInfo.deploy();
```

or using _ethers.js_ on the client-side:

```javascript
import { ethers } from "ethers";

import FashionToken from "path/to/ABI/FashionToken.json"; // ABI for the smart contract
import VerifiedContacts from "path/to/ABI/VerifiedContacts.json"; // ABI for the smart contract
import "path/to/config.json"; // config file with the address of the deployed smart contract

let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const network = await provider.getNetwork();
const accounts = await window.ethereum.request({
  method: "eth_requestAccounts",
});
const signer = provider.getSigner();

const verifiedContracts = new ethers.Contract(
  config[network.chainId].verifiedContracts.address,
  VerifiedContracts,
  signer
);
```

#### `constructor()`

Sets the owner of the contract as the deployer.

##### Arguments

- `none`

##### Visibility

- `none`

##### Returns

- `none`

##### Usage

This function can be called uppon contract deployment.

#### `updateDeliveryStatus(address _buyer, uint256 _nftID, bool _newStatus)`

Updates the delivery status of the product.

##### Arguments

- `_buyer` (address): buyer's address.
- `_nftID` (uint256): id of the product/NFT.
- `_newStatus` (bool): status of the current delivery.

##### Visibility

- `public`
- Only owner, a verified carrier, or the selling contract can call this method.

##### Returns

- `none`

##### Usage

This function can be called as follows:

```solidity
shipmentInfo.updateDeliveryStatus(buyer.address, id, deliveryStatus);
```

- where `id` is an unsigned integer (for example, 15) representing the token id,
- and the `deliveryStatus` is set to `true` if the item has been delivered and `false` otherwise.

##### Notes

At the beginning of every buying operation, this function checks if there is an entry at `delivered` or `inPerson` mappings with the seller's address and the particular product/NFT id and set both mappings to `false`.

- This check is important to prevent the approval of a subsequent sale before delivering the product.

After the completio of the listing operation, the event `productDelivered(buyer's address, product id, is delivered status)` is emitted broadcasting that the product has been delivered.

#### `isDelivered(address _buyer, uint256 _nftID)`

Returns the delivery status for the item.

##### Arguments

- `_buyer` (address): buyer's address.
- `_nftID` (uint256): id of the product/NFT.

##### Visibility

- `public view`

##### Returns

- `bool`: returns `true` if the item has been delivered and `false` otherwise.

##### Usage

This function can be called as follows:

```solidity
shipmentInfo.isDelivered(buyer.address, id);
```

- where `id` is an unsigned integer (for example, 15) representing the token id.

#### `updateInPersonStatus(address _buyer, uint256 _nftID, bool _newStatus)`

Sets the sale as conducted in person.

##### Arguments

- `_buyer` (address): buyer's address.
- `_nftID` (uint256): id of the product/NFT.
- `_newStatus` (bool): if set to `true` means that the sale was conducted in person, otherwise it is set to `false`.

##### Visibility

- `public`
- Only the buyer can call this function.

##### Returns

- `none`

##### Usage

This function can be called as follows:

```solidity
shipmentInfo.updateDeliveryStatus(buyer.address, id, deliveryStatus);
```

- where `id` is an unsigned integer (for example, 15) representing the token id,
- and the `deliveryStatus` is set to `true` if the item has been delivered and `false` otherwise.

##### Notes

At the beginning of every buying operation, this function checks if there is an entry at `inPerson` or `inPerson` mappings with the buyer's address and the particular product/NFT id and set both mappings to `false`.

- This check is important to prevent setting a subsequent sale as conducted in person without the buyers consent.

After the completio of the listing operation, the event `inPersonSaleEvent(buyer's address, product id, is delivered status)` is emitted broadcasting that the selling was conducted in person.

#### `isPresential(address _buyer, uint256 _nftID)`

##### Arguments

- `_buyer` (address): buyer's address.
- `_nftID` (uint256): id of the product/NFT.

##### Visibility

- `public view`

##### Returns

- `bool`: returns `true` if the selling process conducted in person and `false` otherwise.

##### Usage

This function can be called as follows:

```solidity
shipmentInfo.isPresential(buyer.address, id)
```

- where `id` is an unsigned integer (for example, 15) representing the token id.
