/* Run
   npx hardhat run .\scripts\deploy.js --network goerli
*/
// We require the Hardhat Runtime Environment for running the script in a 
// standalone fashion through `node <script>`.
const hre = require("hardhat");
const fs = require("fs"); // to copy the files to be used by the web interface

// Convert ether to wei - helper function
const tokens = (n) => {
  //return ethers.utils.parseUnits(n.toString(), 'ether')
  return 100*n
}


let fashionAddress
let sellingAddress
let trackingAddress
let contactsAddress

const main = async () => {
  // Setup accounts - to get signers use `const signers = await ethers.getSigners()`
  [deployer, buyer, seller, oracle] = await ethers.getSigners()
  console.log('Deployer: ', deployer.address)
  console.log('Buyer:    ', buyer.address)
  console.log('Seller:   ', seller.address)
  console.log('Oracle:   ', oracle.address)
  

  /* Deployment Section */

  // Deploy FashionProducts
  const FashionToken = await ethers.getContractFactory('FashionToken')
  const fashionToken = await FashionToken.deploy()
  await fashionToken.deployed()
  fashionAddress = fashionToken.address

  // Deploy ShippingInfo
  const ShippingInfo = await ethers.getContractFactory('ShippingInfo')
  const shippingInfo = await ShippingInfo.deploy()
  await shippingInfo.deployed()
  trackingAddress = shippingInfo.address

  // Deploy Contacts
  const Contacts = await ethers.getContractFactory('Contacts')
  const contacts = await Contacts.deploy()
  await contacts.deployed()
  contactsAddress = contacts.address


  // Deploy OracleEscrow
  const SellingContract = await ethers.getContractFactory('SellingContract')
  const sellingContract = await SellingContract.deploy(fashionToken.address, contacts.address, shippingInfo.address)
  await sellingContract.deployed()
  sellingAddress = sellingContract.address

  // Change ownership to Selling Escrow
  await fashionToken.changeOwner(sellingContract.address)

  // Deploy Messages
  const Messages = await ethers.getContractFactory('Messages')
  const messages = await Messages.deploy()
  await messages.deployed()
  messagesAddress = messages.address


  // ============================== DEFAULT MINTS ==============================
  await sellingContract.connect(buyer).register('https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/public/metadata/Dior-Hobo-Black_IA002000811.json', 'IA002000811')
  await sellingContract.connect(buyer).register('https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/public/metadata/Dior-Vintage-Sunglasses_IA002000251.json', 'IA002000251')
  await sellingContract.connect(buyer).register('https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/public/metadata/Gucci-Flap-Jackie-Bag.json', 'IA002000404')
  await sellingContract.connect(buyer).register('https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/public/metadata/Gucci-Swing-Red_IA002000868.json', 'IA002000868')
  await sellingContract.connect(buyer).register('https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/public/metadata/Louis-Vuitton-Speedy-Bag.json', 'IA002000769')
  await sellingContract.connect(buyer).register('https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/public/metadata/Marc-Jacobs-Aviator-Glasses_CF003000012.json', 'CF003000012')
  await sellingContract.connect(buyer).register('https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/public/metadata/Valentino-RockStud-1234.json', 'IA002000148')

  let transaction = await fashionToken.connect(buyer).approve(sellingContract.address, 1)
  await transaction.wait()
  transaction = await sellingContract.connect(buyer).list(1, tokens(1))
  await transaction.wait()

  transaction = await fashionToken.connect(buyer).approve(sellingContract.address, 2)
  await transaction.wait()
  transaction = await sellingContract.connect(buyer).list(2, tokens(0.75))
  await transaction.wait()
  
  transaction = await fashionToken.connect(buyer).approve(sellingContract.address, 3)
  await transaction.wait()
  transaction = await sellingContract.connect(buyer).list(3, tokens(1.25))
  await transaction.wait()

  transaction = await fashionToken.connect(buyer).approve(sellingContract.address, 4)
  await transaction.wait()
  transaction = await sellingContract.connect(buyer).list(4, tokens(1.65))
  await transaction.wait()

  transaction = await fashionToken.connect(buyer).approve(sellingContract.address, 6)
  await transaction.wait()
  transaction = await sellingContract.connect(buyer).list(6, tokens(1.85))
  await transaction.wait()

  

  


  /* Console Log results */
  console.log("FashionToken address:       ", fashionToken.address)
  console.log("SellingContract address:      ", sellingContract.address)
  console.log("ShippingInfo address:     ", shippingInfo.address)
  console.log("Contacts address:           ", contacts.address)
  console.log("Messages address:           ", messages.address)
  //console.log("VerifiedContacts address: ")
}

// write function
function writeABIs(_destination, _data) {
  // save new file
  var options = { flag : 'w' };
  fs.writeFileSync(_destination, _data , options, function(err) {
    if (err) throw err;
    console.log('complete');
  })
}

// Function to copy the ABI files
function createABIFiles() {
  // Fashion Token ABI
  let jsonFile = fs.readFileSync('./artifacts/contracts/FashionToken.sol/FashionToken.json')
  let jsonData = JSON.parse(jsonFile);
  let stringfyData = JSON.stringify(jsonData.abi, null, " ")

  let abiFilePath = "../client/src/abis/FashionToken.json"
  //writeData('../client/src/abis/FashionToken.sol', attribute)
  writeABIs(abiFilePath, stringfyData)

  // Selling Escrow ABI
  jsonFile = fs.readFileSync('./artifacts/contracts/SellingContract.sol/SellingContract.json')
  jsonData = JSON.parse(jsonFile);
  stringfyData = JSON.stringify(jsonData.abi, null, " ")

  abiFilePath = "../client/src/abis/SellingContract.json"
  writeABIs(abiFilePath, stringfyData)

  // Contacts ABI
  jsonFile = fs.readFileSync('./artifacts/contracts/Contacts.sol/Contacts.json')
  jsonData = JSON.parse(jsonFile);
  stringfyData = JSON.stringify(jsonData.abi, null, " ")

  abiFilePath = "../client/src/abis/Contacts.json"
  writeABIs(abiFilePath, stringfyData)

  // Tracking Oracle ABI
  jsonFile = fs.readFileSync('./artifacts/contracts/ShippingInfo.sol/ShippingInfo.json')
  jsonData = JSON.parse(jsonFile);
  stringfyData = JSON.stringify(jsonData.abi, null, " ")

  abiFilePath = "../client/src/abis/ShippingInfo.json"
  writeABIs(abiFilePath, stringfyData)

  // Messages ABI
  jsonFile = fs.readFileSync('./artifacts/contracts/Messages.sol/Messages.json')
  jsonData = JSON.parse(jsonFile);
  stringfyData = JSON.stringify(jsonData.abi, null, " ")

  abiFilePath = "../client/src/abis/Messages.json"
  writeABIs(abiFilePath, stringfyData)
}


// Function to create/ update config.json file
function createConfigJSON(_fashionAddress, _trackingAddress, _sellingAddress, _contactsAddress, _messagesAddress) {
  const configFilePath = "../client/src/config.json";

  // Create data JSON with contents
  var data = {}
  data[31337] = [] //localhost
  //data[5] = [] // Goerli

  //data[5] = {
  data[31337] = {
    fashionToken: {
      address: _fashionAddress
    },
    shippingInfo: {
      address: _trackingAddress
    },
    contacts: {
      address: _contactsAddress
    },
    sellingContract: {
      address: _sellingAddress
    },
    messages: {
      address: _messagesAddress
    }
  }

  // save new file
  stringfyData = JSON.stringify(data, null, " ")
  var options = { flag : 'w' };
  fs.writeFileSync(configFilePath, stringfyData , options, function(err) {
    if (err) throw err;
    console.log('complete');
  })

}


const runMain = async () => {
  let sourceABI
  let destinationPath
  try {
    await main()
    // copy files to client-side
    createABIFiles()
    // create config.json with deployed addresses
    createConfigJSON(fashionAddress, trackingAddress, sellingAddress, contactsAddress, messagesAddress)
    // terminate without errors
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain()