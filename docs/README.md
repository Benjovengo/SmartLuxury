# Smart Luxury Technical Documentation

## Introduction

Welcome to the technical documentation for Smart Luxury, a Web 3 full-stack project that consists of an online store that sells fashion goods with authenticity and delivery guaranteed by smart contracts.

Our platform is built on the Ethereum blockchain, deployed on the _Göerli Test Network_, and utilizes smart contracts to ensure that all of our products are authentic and that delivery is guaranteed. We have three main smart contracts that make up our platform:

- **Contacts**: this contract is responsible for storing information about the first name, last name, and address of the registered customers, based on their MetaMask address.

- **FashionToken**: this contract is responsible for the creation of a custom ERC-20 token to store the products' metadata. Each product is represented by a unique token that contains information such as the product's name, description, and image URL.

- **Messages**: responsible for sending messages to the creator of the project using the blockchain. Not the most efficient (nor the cheapest) way, but, considering that this project is based on the blockchain, it had to be done that way.

- **SellingContract**: this contract is responsible for the management of the sales. It allows sellers to register new products, list them for sale, and remove them from sale. It also allows buyers to deposit earnest money, approve the sale after delivery, and finalize the sale.

- **ShippingInfo**: responsible for updating the shipment status of purchases.

- **VerifiedContacts**: similar to the Contacts smart contract, but for the registration of companies (manufacturers, delivery companies, etc.).

On the next section, each contract will be fully explained, including its functions, logic, parameters, and usage examples. We will also provide information on how to interact with the contracts using different Web3 libraries and frameworks.

We hope that this documentation will be helpful in understanding the inner workings of the Smart Luxury platform. If you have any questions or need further assistance, please don't hesitate to contact us using the _Contact Us_ section of our website.

## Smart Contracts

This section of the documentation will provide an in-depth look at the various smart contracts that make up the Smart Luxury platform.

1. [Contacts](Contacts.md)

- The purpose of this smart contract is to manage the accounts of regular customers of the store. The contract allows for anyone to register and make updates to their personal information without the need for verification. Authentication of the customer's account is achieved through the use of their unique address on the blockchain, ensuring that only the customer is able to update their information.

2. [FashionToken](FashionToken.md)

- The purpose of this smart contract is to establish a custom ERC-721 token to serve as a representation of the product within the blockchain ecosystem. This token contract is designed to assign a unique identification number to each product serial number, thus ensuring that no duplicate serial numbers are registered within the system. Additionally, the token contract is configured to store relevant metadata pertaining to each product, providing a comprehensive and easily accessible record of the product's characteristics and attributes. Overall, this smart contract serves as a robust and reliable means of tracking and managing product information within the blockchain.

3. [Messages](Messages.md)

- This smart contract serves as a mechanism for the storage of any messages that may be submitted by users. It should be noted that access to these messages is restricted to my account and there is no means by which the identity of the sender can be determined. In the event that a response is desired, it is recommended that the individual include their contact information within the message, as this will enable me to initiate communication in a timely manner.

4. [SellingContract](SellingContract.md)

- The purpose of this smart contract is to facilitate the management of sales transactions. The sales process is comprised of three distinct stages:

  4.1. The seller initiates the transaction by transferring ownership of an ERC-721 token, which serves as a representation of the product being sold, to the Selling contract and specifying the price.

  4.2. The buyer then deposits an amount equal to the price of the product into the contract.

  4.3. A verifier, responsible for ensuring that the product has been delivered from the seller to the buyer, approves the sale.

Upon approval, the transferred ether is disbursed to the seller and the ownership of the corresponding ERC-721 token is transferred to the buyer.

5. [ShippingInfo](ShippingInfo.md)

6. [VerifiedContacts](VerifiedContacts.md)

---

---

## Goerli Network

### Introduction to the Goerli Testnet

The Goerli Network is a test network for Ethereum-based projects. It is a public testnet that allows developers to test their contracts and dapps without the need for real Ether. Goerli allows developers to test their contracts on a network that is similar to the Ethereum mainnet, providing a more accurate simulation of the mainnet environment.

One of the advantages of Goerli is that it has a higher block limit than other testnets, which allows for faster and more efficient testing. Additionally, it has a higher number of active nodes, which makes it more resistant to network partitions and other issues that can occur on testnets with fewer nodes.

Overall, the Goerli Network is a valuable tool for Ethereum developers looking to test their projects in a realistic and reliable environment. Its high block limit, active nodes and compatibility with the Ethereum mainnet makes it one of the best testnets for Ethereum-based projects.

### Setup and Deployment

#### hardhat.config.js

To configure Hardhat to deploy a smart contract to the Goerli Testnet, you will need to add a network entry to your `hardhat.config.js` file containing the following parameters:

- `chainId`: This is the unique identifier of the Goerli network. The value for this parameter should be set to `5`.

- `rpcUrl`: This is the URL of the Goerli testnet's JSON-RPC endpoint. The default value for this parameter is `https://rpc.goerli.mudit.blog/`.

- `blockExplorerUrl`: This is the URL of the Goerli testnet's block explorer, which can be used to view transactions and smart contract data on the network. The default value for this parameter is `https://goerli.etherscan.io/`.

```
// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = "YOUR GOERLI PRIVATE KEY";

module.exports = {
  networks: {
    goerli: {
      chainId: 5,
      rpcUrl: 'https://rpc.goerli.mudit.blog/',
      blockExplorerUrl: 'https://goerli.etherscan.io/',
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
```

#### Deployment

Once you have set the parameters to the `hardhat.config.js` config file, you can use Hardhat to deploy your smart contract to the Göerli Testnet by running the `hardhat run` command with the `--network` flag set to `goerli`.

Example:

```
npx hardhat run scripts/deploy.js --network goerli
```

For more details about deploying contracts to a live network using Hardhat, see the official Hardhat documentation at [Deploying to a live network](https://hardhat.org/tutorial/deploying-to-a-live-network).

#### Notes

_You'll have to change Metamask's network to Göerli before transacting._

It's important to notice that you will need to have some goerli test ethers to deploy and test your smart contract on the Goerli testnet. You can get some at [Göerli Faucet](https://goerli-faucet.slock.it/)

Also, you can check the contract address, balance and other important information on the block explorer url [Göerli Etherscan](https://goerli.etherscan.io/)
