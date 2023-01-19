import { ethers } from 'ethers';

/* Contract */
import SellingEscrow from '../abis/SellingEscrow.json'
import config from '../config.json'; // config

/* Create JSON tokenURI */

export const createJSON = (_name, _brand, _desc, _img, _id, _sku, _category, _condition, _material, _accessory, _weight, _madeIn, _year) => {
  // Create metadata JSON file
  var data = {}

  data = {
    name: _name,
    brand: _brand,
    description: _desc,
    image: _img,
    id: _id,
    SKU: _sku,
    attributes: [
      {
        trait_type: "Type of Product",
        value: _category
      },
      {
        trait_type: "Condition",
        value: _condition
      },
      {
        trait_type: "Material",
        value: _material
      },
      {
        trait_type: "Accessory(ies)",
        value: _accessory
      },
      {
        trait_type: "Weight",
        value: _weight
      },
      {
        trait_type: "Made In",
        value: _madeIn
      },
      {
        trait_type: "Year",
        value: _year
      }
    ]
  }

  console.log(data)
  return data
}

/* Register new product */
export const registerProduct = async (_tokenURI, _serialNumber) => {
  // Setup provider and network
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  const network = await provider.getNetwork()

  // get signer
  const signer = provider.getSigner();

  // Javascript "version" of the contact smart contract
  const sellingEscrow = new ethers.Contract(config[network.chainId].sellingEscrow.address, SellingEscrow, signer)

  // add account
  await sellingEscrow.register(_tokenURI, _serialNumber)
}
