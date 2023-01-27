### FashionToken Smart Contract

The present smart contract employs the utilization of the ERC-721 and ERC-721URIStorage implementation modules from OpenZeppelin in order to define the custom ERC-721 token that is utilized for the storage of information pertaining to the products tracked by this system. For further information regarding the OpenZeppelin modules, please refer to the official website at [www.openzeppelin.com](https://www.openzeppelin.com/).

#### State Variables

- `_tokenIds` (Counters)
- `owner` (address)
- `authorizeVerifier` (address)
- `deployer` (address)
- `numberOfOwners` (mapping: product ID => number of owners)
- `listOwners` (mapping: product ID => mapping: owner number => owner's address)
- `registeredSerialNumber` (mapping: serial number string => is registered or not)
- `productID` (mapping: serial number string => product ID)
- `canFinalize` (mapping: product ID => approve finalize sale)

#### Events

#### Functions

Before using these functions, the smart contract needs to deployed to a Hardhat node or to a testnet (it is not recommended to use any of the code from this project on a real project - it is not production ready!). After starting the node, run

```javascript
const FashionToken = await ethers.getContractFactory("FashionToken");
fashionToken = await FashionToken.deploy();
```

or using _ethers.js_ on the client-side:

```javascript
import { ethers } from "ethers";

import FashionToken from "path/to/ABI/FashionToken.json"; // ABI for the smart contract
import "path/to/config.json"; // config file with the address of the deployed smart contract

let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const network = await provider.getNetwork();
const accounts = await window.ethereum.request({
  method: "eth_requestAccounts",
});
const signer = provider.getSigner();

const fashionToken = new ethers.Contract(
  config[network.chainId].fashionToken.address,
  FashionToken,
  signer
);
```

#### `constructor()`

- Sets the name of the ERC-721 token and its symbol.
- Sets the owner and the deployer of the token.

##### Arguments

- `none`

##### Visibility

- `none`

##### Returns

- `none`

##### Usage

Function called at deployment.

##### Notes

The address set as the deployer is the one that will receive the fees for the transactions on the web store.

#### `changeOwner(address _newOwner)`

Change ownership of this token contract.

- The SellingContract must be the owner of this token contract.

##### Arguments

- `newOwner` (address): address of the new owner of the token. In this project, it is the Selling contract.

##### Visibility

- `public`
- Only the owner can call this function.

##### Returns

- `none`

##### Usage

In case the owner wants to call it, the function can be called as follows:

```solidity
fashion.changeOwner(newOwnerAddress);
```

##### Notes

This function is used to transfer the ownership of the token to the Selling contract. It separates the owner from the deployer.

#### `setVerifier(address _verifier)`

Authorize a verifier to check the delivery status.

##### Arguments

- `_verifier` (type): address of a contact present in the VerifiedContacts list.

##### Visibility

- `public`
- Only the owner can call this function.

##### Returns

- `none`

##### Usage

After the deployment, the function can be called as follows:

```solidity
fashion.setVerifier(verifierAddress);
```

#### `mint(string memory tokenURI, address _newOwner, string memory _serialNumber)`

Mint a new token.

- Require the selling contract to call this function
- Require that the serial number of the product is not already registered
- If the serial number has already been registered, then return 0
- Otherwise mint the product and increment the tokenID counter

##### Arguments

- `tokenURI` (string memory): the metadata URI for the token
- `_newOwner` (address): address to mint the token to
- `_serialNumber` (string memory): serial number of the product

##### Visibility

- `public`
- Only the Selling contract can mint products.

##### Returns

- `uint256`: the ID of the new token.

##### Usage

The function can be called as follows:

```solidity
fashion.mint('https://where.the.URI.is/', productOwnerAddress, 'SerialNumberString')
```

#### `getOwnershipOf(uint256 _nftId)`

Return the current ownership of the product NFT.

##### Arguments

- `_nftId` (uint256): ID of the NFT.

##### Visibility

- `public view`

##### Returns

- `address`: owner of the token

##### Usage

The function can be called as follows:

```solidity
fashion.getOwnershipOf(ID);
```

- where `ID` is an unsigned integer (for example, 15).

#### `totalSupply()`

Returns the total number of products/NFTs registered.

##### Arguments

- `none`

##### Visibility

- `public view`

##### Returns

- `uint256`: total number of registered tokens

##### Usage

This function can be called as follows:

```solidity
fashion.totalSupply();
```

#### `addToOwners(uint256 _nftID, address _newOwner)`

Update list of owners with the addition of the address of a new owner.

##### Arguments

- `_nftID` (uint256): id of the token to which will be added a new owner
- `_newOwner` (address): address of the new owner

##### Visibility

- `public`
- Only the current owner of the NFT can call this function.

##### Returns

- `none`

##### Usage

This function can be called as follows:

```solidity
fashion.addToOwners(id, newOwnerAddress);
```

- where `id` is an unsigned integer (for example, 15).

#### `getOwner(uint256 _nftID, uint256 _ownerIndex)`

Returns one of the owners (past or present) of a given token.

##### Arguments

- `_nftID` (uint256): id of the product/NFT token.
- `_ownerIndex` (uint256): index of the owner in the owner's list for a particular token id.

##### Visibility

- `public view`

##### Returns

- `address`: address of the nth owner of the token.

##### Usage

This function can be called as follows:

```solidity
fashion.getOwner(id, ownerIndex);
```

- where `id` is an unsigned integer (for example, 15) representing the token id
- `ownerIndex` is also an unsigned integer, ranging from 1 to the total number of owners that a particular has since its creation.

#### `getFirstOwner(uint256 _nftID)`

Returns the first owner of a token.

##### Arguments

- `_nftID` (uint256): id of the product/NFT token.

##### Visibility

- `public view`

##### Returns

- `address`: address of the creator/first owner of the token.

##### Usage

This function can be called as follows:

```solidity
fashion.getFirstOwner(id);
```

- where `id` is an unsigned integer (for example, 15) representing the token id

##### Notes

This function is used to make it easier to identify and verify the product origins.

#### `isRegistered(string memory _serialNum)`

Returns if a serial number has already been registered.

##### Arguments

- `_serialNum` (string memory): string containing the serial number of the product.

##### Visibility

- `public view`

##### Returns

- `bool`: check if the serial number of the product has already been registered.

##### Usage

This function can be called as follows:

```solidity
fashion.isRegistered('SerialNumber');
```

#### `getProductID(string memory _serialNumber)`

Returns the product id given the serial number for the product.

##### Arguments

- `_serialNumber` (string memory): string containing the serial number of the product.

##### Visibility

- `public view`

##### Returns

- `uint256`: id of the product/NFT.

##### Usage

This function can be called as follows:

```solidity
fashion.getProductID('SerialNumber');
```

#### `setFinalizeDelivery(uint256 _nftID, bool _status)`

Sets if a sale can be finalized from the delivery stand point.

##### Arguments

- `_nftID` (uint256): id of the product/NFT token.
- `_status` (bool): set the status of the delivery for the product.

##### Visibility

- `public`
- Only the owner of the FashionToken contract or an authorized verifier can call this function.

##### Returns

- `none`

##### Usage

This function can be called as follows:

```solidity
fashion.setFinalizeDelivery(id, true);
```

- where `id` is an unsigned integer (for example, 15) representing the token id.

#### `getFinalizeStatus(uint256 _nftID)`

Returns if the delivery process has been completed and the sale can be finalized.

##### Arguments

- `var_name` (type): description

##### Visibility

- `public view`

##### Returns

- `bool`: indication that the sale can be finalized or not.

##### Usage

This function can be called as follows:

```solidity
fashion.getFinalizeStatus(id)
```

- where `id` is an unsigned integer (for example, 15) representing the token id.
