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

#### `constructor()`

- Sets the name of the ERC-721 token and its symbol.
- Sets the owner and the deployer of the token.

##### Parameters

- `none`

##### Scope

- `none`

##### Returns

- `none`

##### Usage

Function called at deployment.

##### Notes

The address set as the deployer is the one that will receive the fees for the transactions on the web store.
