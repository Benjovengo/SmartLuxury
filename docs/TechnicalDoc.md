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
