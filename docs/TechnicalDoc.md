# Smart Luxury Technical Documentation

## Introduction

Welcome to the technical documentation for Smart Luxury, a Web 3 full-stack project that consists of an online store that sells fashion goods with authenticity and delivery guaranteed by smart contracts.

Our platform is built on the Ethereum blockchain, deployed on the _Göerli Test Network_, and utilizes smart contracts to ensure that all of our products are authentic and that delivery is guaranteed. We have three main smart contracts that make up our platform:

- **Contacts**: This contract is responsible for storing information about the first name, last name, and address of the registered customers, based on their MetaMask address.

- **FashionToken**: this contract is responsible for the creation of a custom ERC-20 token to store the products' metadata. Each product is represented by a unique token that contains information such as the product's name, description, and image URL.

- **Messages**: responsible for sending messages to the creator of the project using the blockchain. Not the most efficient (nor the cheapest) way, but, considering that this project is based on the blockchain, it had to be done that way.

- **SellingContract**: this contract is responsible for the management of the sales. It allows sellers to register new products, list them for sale, and remove them from sale. It also allows buyers to deposit earnest money, approve the sale after delivery, and finalize the sale.

- **ShippingInfo**: responsible for updating the shipment status of purchases.

- **VerifiedContacts**: similar to the Contacts smart contract, but for the registration of companies (manufacturers, delivery companies, etc.).

On the next section, each contract will be fully explained, including its functions, logic, parameters, and usage examples. We will also provide information on how to interact with the contracts using different Web3 libraries and frameworks.

We hope that this documentation will be helpful in understanding the inner workings of the Smart Luxury platform. If you have any questions or need further assistance, please don't hesitate to contact us using the _Contact Us_ section of our website.

## Contracts

This documentation will provide an in-depth look at the various smart contracts that make up the Smart Luxury platform.

### Smart Contract Name - TEMPLATE

#### `getProduct(string productId)`

This function is used to retrieve the details of a specific product from the smart contract.

##### Parameters

- `productId` (string): The unique identifier of the product.

##### Returns

- `product` (object): An object containing the details of the product, including name, description, price, and image url.

##### Usage

The getProduct function is useful for displaying product details on the website or for comparing products before making a purchase. It can also be used to check the existence of a product in the smart contract before listing or unlisting it.

```
smartLuxury.getProduct("12345")
```

##### Notes

- If the provided productId does not match any existing product, the function will return `null`.
- It's important to be aware that the function returns an object with the product details, so the developer should handle it.

---

---

## Goerli Network

### Introduction to the Goerli Testnet

The Goerli Network is a test network for Ethereum-based projects. It is a public testnet that allows developers to test their contracts and dapps without the need for real Ether. Goerli allows developers to test their contracts on a network that is similar to the Ethereum mainnet, providing a more accurate simulation of the mainnet environment.

One of the advantages of Goerli is that it has a higher block limit than other testnets, which allows for faster and more efficient testing. Additionally, it has a higher number of active nodes, which makes it more resistant to network partitions and other issues that can occur on testnets with fewer nodes.

Overall, the Goerli Network is a valuable tool for Ethereum developers looking to test their projects in a realistic and reliable environment. Its high block limit, active nodes and compatibility with the Ethereum mainnet makes it one of the best testnets for Ethereum-based projects.

### Setup and Deployment

#### Deployment

```
npx hardhat run scripts/deploy.js --network goerli
```

For more details about deploying contracts to a live network using Hardhat, see the official Hardhat documentation at [Deploying to a live network](https://hardhat.org/tutorial/deploying-to-a-live-network).
