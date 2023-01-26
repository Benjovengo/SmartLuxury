### Contacts Smart Contract

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

##### `constructor()`

The constructor sets the `owner` of the smart contract as the deployer (_msg.sender_).

##### Parameters

- `none`

##### Returns

- `none`

#### `addAccount(string memory _firstName, string memory _lastName, string memory _avatar, string memory  email, string memory _physicalAddress, uint256 _poBox)`

The purpose of this function is to facilitate the management of customer accounts on the Blockchain. Specifically, it allows for the creation or modification of an association between a customer's address on the Blockchain and their corresponding Customer struct. When invoked, the function will first determine whether an existing association exists for the specified customer address.

- If no association exists, the function will create a new association linking the customer address to the Customer struct provided by the customer.

- If an association already exists, the function will update the existing association with the new data provided by the customer. This ensures that customer information is always current and accurate on the Blockchain.

##### Parameters

- `firstName` (string): first name
- `lastName` (string): last name
- `avatar` (string): the customer can choose an avatar for the account
- `email` (string): email of the customer
- `physicalAddress` (string): the address of the user.
- `poBox` (uint256): P.O. Box number.

This information is stored as strings in the Blockchain, but in a real-world implementation, the hash of that information should be stored in order not to reveal any customer details.

##### Returns

- `none`

##### Usage

Before using this function, one need to deploy it to a Hardhat node. After starting the node, run

```
const Contacts = await ethers.getContractFactory('Contacts')
contacts = await Contacts.deploy()
```

or using _ethers.js_ on the client-side:

```
import Contacts from 'path/to/ABI/Contacts.json' // ABI for the smart contract
import 'path/to/config.json' // config file with the address of the deployed smart contract

const contacts = new ethers.Contract(config[network.chainId].contacts.address, Contacts, signer)
```

After the deployment, the function can be called as follows:

```
contacts.addAccount('First Name', 'Last Name', 'https://link.to/avatar', 'email@provider.com', 'Street, City, Country', 12345678)
```
