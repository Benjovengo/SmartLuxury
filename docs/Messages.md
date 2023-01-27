### Messages Smart Contract

#### State Variables

- `owner` (address)
- `numberOfUsers` (uint256)
- `Message` (struct)
  - `ethAccount` (address)
  - `name` (string)
  - `email` (string)
  - `subject` (string)
  - `body` (string)
- `allMessages` (mapping: message id => Message struct)
- `isNew` (mapping: message id => is new message or not)
- `messengerId` (mapping: sender's address => sender's id)

#### Events

#### Functions

Before using these functions, the smart contract needs to deployed to a Hardhat node or to a testnet (it is not recommended to use any of the code from this project on a real project - it is not production ready!). After starting the node, run

```javascript
const Messages = await ethers.getContractFactory("Messages");
messages = await Messages.deploy();
```

or using _ethers.js_ on the client-side:

```javascript
import { ethers } from "ethers";

import Messages from "path/to/ABI/Messages.json"; // ABI for the smart contract
import "path/to/config.json"; // config file with the address of the deployed smart contract

let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const network = await provider.getNetwork();
const accounts = await window.ethereum.request({
  method: "eth_requestAccounts",
});
const signer = provider.getSigner();

const messages = new ethers.Contract(
  config[network.chainId].messages.address,
  Messages,
  signer
);
```

##### `constructor()`

The constructor sets the `owner` of the smart contract as the deployer (_msg.sender_).

##### Arguments

- `none`

##### Visibility

- `none`

##### Returns

- `none`

#### `addMessage(string memory _name, string memory _email, string memory _subject, string memory _body)`

##### Arguments

- `_name` (string memory): name of the sender of the message.
- `_email` (string memory): email of the sender in order for us to be able to reply.
- `_subject` (string memory): subject of the message.
- `_body` (string memory): message body.

##### Visibility

- `public`

##### Returns

- `none`

##### Usage

This function can be called as follows:

```solidity
message.addMessage('Your Name', 'your.email@provider.com', 'What is it about.', 'The message itself');
```

##### Notes

Due to the implementation, only the last message sent by each blockchain address will be fetched when calling this function.

#### `notNew(uint256 _userID)`

Mark message as read.

##### Arguments

- `_userID` (uint256): id of the sender (associated with a blockchain address)

##### Visibility

- `public`

##### Returns

- `none`

##### Usage

This function can be called as follows:

```solidity
messages.notNew(id);
```

- where `id` is an unsigned integer (for example, 15) and represents the id of the sender of the message.
