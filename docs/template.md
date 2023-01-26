### Smart Contract Name - TEMPLATE

#### State Variables

#### Events

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
