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
