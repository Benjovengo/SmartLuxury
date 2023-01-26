### FashionToken Smart Contract

The present smart contract employs the utilization of the ERC-721 and ERC-721URIStorage implementation modules from OpenZeppelin in order to define the custom ERC-721 token that is utilized for the storage of information pertaining to the products tracked by this system. For further information regarding the OpenZeppelin modules, please refer to the official website at [www.openzeppelin.com](https://www.openzeppelin.com/).

Before using these functions, the smart contract needs to deployed to a Hardhat node or to a testnet (it is not recommended to use any of the code from this project on a real project - it is not production ready!). After starting the node, run

```
const FashionToken = await ethers.getContractFactory('FashionToken')
fashionToken = await FashionToken.deploy()
```

or using _ethers.js_ on the client-side:

```
import Contacts from 'path/to/ABI/FashionToken.json' // ABI for the smart contract
import 'path/to/config.json' // config file with the address of the deployed smart contract

let provider = new ethers.providers.Web3Provider(window.ethereum, "any")
const network = await provider.getNetwork()
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
const signer = provider.getSigner();

const fashionToken = new ethers.Contract(config[network.chainId].fashionToken.address, FashionToken, signer)
```

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

/_ Change ownership of this token contract - the SellingContract must be the owner of this token contract
_/
function changeOwner(address \_newOwner) public {
require(msg.sender == owner);
owner = \_newOwner;
}
