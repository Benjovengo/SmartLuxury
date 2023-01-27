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

Before using these functions, the smart contract needs to deployed to a Hardhat node or to a testnet (it is not recommended to use any of the code from this project on a real project - it is not production ready!). After starting the node, run

```
const Contacts = await ethers.getContractFactory('Contacts')
contacts = await Contacts.deploy()
```

or using _ethers.js_ on the client-side:

```
import { ethers } from 'ethers';

import Contacts from 'path/to/ABI/Contacts.json' // ABI for the smart contract
import 'path/to/config.json' // config file with the address of the deployed smart contract

let provider = new ethers.providers.Web3Provider(window.ethereum, "any")
const network = await provider.getNetwork()
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
const signer = provider.getSigner();

const contacts = new ethers.Contract(config[network.chainId].contacts.address, Contacts, signer)
```

**Important Note**

- Only the owner of this contract can add contacts to the list of verified contacts.

##### `constructor()`

The constructor sets the `owner` of the smart contract as the deployer (_msg.sender_).

##### Arguments

- `none`

##### Visibility

- `none`

##### Returns

- `none`

#### `addAccount(string memory _firstName, string memory _lastName, string memory _avatar, string memory  email, string memory _physicalAddress, uint256 _poBox)`

<table style="border-collapse: collapse;width: fit-content;">
  <tr>
    <td style="border: 1px solid black;font-size: 1.25rem;padding: 0px 1em;text-align: center;">
      <b>Function Diagram</b>
    </td>
  </tr>
  <tr>
    <td style="border: 1px solid black;padding: 0px 1em;text-align: center;">
      <b>Function: </b><tt>addAccount</tt>
    </td>
  </tr>
  <tr>
    <td style="border: 1px solid black;padding: 0px 1em 0px 0px;text-align: left;">
      Arguments
      <ul style="list-style-position: outside;margin: 0;padding-left: 1.5em; text-align: left;">
        <li><tt>firstName: string</tt></li>
        <li><tt>lastName: string</tt></li>
        <li><tt>avatar: string</tt></li>
        <li><tt>email: string</tt></li>
        <li><tt>physicalAddress: string</tt></li>
        <li><tt>poBox: uint256</tt></li>
      </ul>
      Visibility
        <ul style="list-style-position: outside;margin: 0;padding-left: 1.5em; text-align: left;">
          <li><tt>public</tt></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td style="border: 1px solid black;padding: 0px 1em;text-align: left;">
      <b>Return:</b> <tt>void</tt>
    </td>
  </tr>
</table>

The purpose of this function is to facilitate the management of customer accounts on the Blockchain. Specifically, it allows for the creation or modification of an association between a customer's address on the Blockchain and their corresponding Customer struct. When invoked, the function will first determine whether an existing association exists for the specified customer address.

- If no association exists, the function will create a new association linking the customer address to the Customer struct provided by the customer.

- If an association already exists, the function will update the existing association with the new data provided by the customer. This ensures that customer information is always current and accurate on the Blockchain.

##### Arguments

- `firstName` (string): first name
- `lastName` (string): last name
- `avatar` (string): the customer can choose an avatar for the account
- `email` (string): email of the customer
- `physicalAddress` (string): the address of the user.
- `poBox` (uint256): P.O. Box number.

This information is stored as strings in the Blockchain, but in a real-world implementation, the hash of that information should be stored in order not to reveal any customer details.

##### Visibility

- `public`

##### Returns

- `none`

##### Usage

After the deployment, the function can be called as follows:

```
contacts.addAccount('First Name', 'Last Name', 'https://link.to/avatar', 'email@provider.com', 'Street - City - Country', 12345678)
```

#### `getCustomerInfo(address _customerAddress)`

##### Arguments

- `_customerAddress` (address): address of the account

##### Visibility

- `public view`

##### Returns

- `Customer` (struct): personal information about the account associated with the given address. If there is no association, returns an empty object.

##### Usage

After the deployment, the function can be called as follows:

```
customerInfo = contacts.getCustomerInfo(address_of_the_customer)
```

##### Notes

`customerInfo` is a struct defined in the _State Variables_ section.

#### `addCustomerItems(address _customerAddress, uint256 _tokenId)`

Add products described by the token ID to the customer wallet. The customer is then the owner of the items added.

##### Arguments

- `_customerAddress` (address): blockchain address of the customer
- `_tokenId_` (uint256): ID of the product to be added to the customer's collection of products

##### Visibility

- `public`

##### Returns

- `none`

##### Usage

This function can be called as follows:

```
contacts.addCustomerItems(customerAddress, 15)
```

##### Notes

Before adding a product to an account, a check is performed to ensure that the given product ID hasn't already been added.

#### `removeCustomerItems(address _customerAddress, uint256 _tokenId)`

Remove the product ID from the owned products list.

##### Arguments

- `_customerAddress` (address): blockchain address of the customer
- `_tokenId_` (uint256): ID of the product to be added to the customer's collection of products

##### Visibility

- `public`

##### Returns

- `none`

##### Usage

This function can be called as follows:

```
contacts.removeCustomerItems(customerAddress, 15)
```

#### `getOwned(address _customerAddress)`

Get an array of token IDs of the products owned by a customer (represented by the customer's blockchain address).

##### Arguments

- `_customerAddress` (address): blockchain address of the customer

##### Visibility

- `public view`

##### Returns

- `uint256[]`: array of token IDs

##### Usage

After the deployment, the function can be called as follows:

```
contacts.getOwned(customerAddress)
```

##### Notes

The result is an array of token IDs (uint256) so that the client-side can iterate on to get the list of all products owned by a certain address.
