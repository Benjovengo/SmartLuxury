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

const main = async () => {
    // Setup accounts - to get signers use `const signers = await ethers.getSigners()`
    [deployer, buyer, seller, oracle] = await ethers.getSigners()

  /* Deployment Section */
  // Deploy VerifiedContracts

  // Deploy FashionProducts
  const FashionToken = await ethers.getContractFactory('FashionToken')
  const fashionToken = await FashionToken.deploy()
  await fashionToken.deployed()
  fashionAddress = fashionToken.address

  // Deploy TrackingOracle
  const TrackingOracle = await ethers.getContractFactory('TrackingOracle')
  const trackingOracle = await TrackingOracle.deploy()
  await trackingOracle.deployed()
  trackingAddress = trackingOracle.address

  // Deploy OracleEscrow
  const SellingEscrow = await ethers.getContractFactory('SellingEscrow')
  const sellingEscrow = await SellingEscrow.deploy(fashionToken.address, trackingOracle.address)
  await sellingEscrow.deployed()
  sellingAddress = sellingEscrow.address

  // Change ownership to Selling Escrow
  await fashionToken.changeOwner(sellingEscrow.address)


  // ============================== DEFAULT MINTS ==============================
  await sellingEscrow.connect(seller).register('https://raw.githubusercontent.com/Benjovengo/SmartLuxury/front-end-integration/client/public/metadata/Dior-Hobo-Black_IA002000811.json', 'ia002000024')
  await sellingEscrow.connect(buyer).register('https://raw.githubusercontent.com/Benjovengo/SmartLuxury/front-end-integration/client/public/metadata/Dior-Vintage-Sunglasses_IA002000251.json', 'ia002000025')
  await sellingEscrow.connect(deployer).register('https://raw.githubusercontent.com/Benjovengo/SmartLuxury/front-end-integration/client/public/metadata/Gucci-Flap-Jackie-Bag.json', 'ia002000124')
  await sellingEscrow.connect(oracle).register('https://raw.githubusercontent.com/Benjovengo/SmartLuxury/front-end-integration/client/public/metadata/Gucci-Swing-Red_IA002000868.json', 'ia002000024')
  await sellingEscrow.connect(seller).register('https://raw.githubusercontent.com/Benjovengo/SmartLuxury/front-end-integration/client/public/metadata/Louis-Vuitton-Speedy-Bag.json', 'ia002000028')
  await sellingEscrow.connect(seller).register('https://raw.githubusercontent.com/Benjovengo/SmartLuxury/front-end-integration/client/public/metadata/Marc-Jacobs-Aviator-Glasses_CF003000012.json', 'ia002000324')
  await sellingEscrow.connect(seller).register('https://raw.githubusercontent.com/Benjovengo/SmartLuxury/front-end-integration/client/public/metadata/Valentino-RockStud-1234.json', 'ia002000028')

  // Seller approval
  let transaction = await fashionToken.connect(seller).approve(sellingEscrow.address, 1)
  await transaction.wait()
  // List product
  transaction = await sellingEscrow.connect(seller).list(1, 55)
  await transaction.wait()

  // Seller approval
  transaction = await fashionToken.connect(buyer).approve(sellingEscrow.address, 2)
  await transaction.wait()
  // List product
  transaction = await sellingEscrow.connect(buyer).list(2, 155)
  await transaction.wait()
  // ============================== DEFAULT MINTS ==============================

  /* Console Log results */
  console.log("FashionToken address:       ", fashionToken.address)
  console.log("SellingEscrow address:      ", sellingEscrow.address)
  console.log("TrackingOracle address:     ", trackingOracle.address)
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
  jsonFile = fs.readFileSync('./artifacts/contracts/SellingEscrow.sol/SellingEscrow.json')
  jsonData = JSON.parse(jsonFile);
  stringfyData = JSON.stringify(jsonData.abi, null, " ")

  abiFilePath = "../client/src/abis/SellingEscrow.json"
  //writeData('../client/src/abis/FashionToken.sol', attribute)
  writeABIs(abiFilePath, stringfyData)

  // Tracking Oracle ABI
  jsonFile = fs.readFileSync('./artifacts/contracts/TrackingOracle.sol/TrackingOracle.json')
  jsonData = JSON.parse(jsonFile);
  stringfyData = JSON.stringify(jsonData.abi, null, " ")

  abiFilePath = "../client/src/abis/TrackingOracle.json"
  //writeData('../client/src/abis/FashionToken.sol', attribute)
  writeABIs(abiFilePath, stringfyData)
}


// Function to create/ update config.json file
function createConfigJSON(_fashionAddress, _trackingAddress, _sellingAddress) {
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
    trackingOracle: {
      address: _trackingAddress
    },
    sellingEscrow: {
      address: _sellingAddress
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
    createConfigJSON(fashionAddress, trackingAddress, sellingAddress)
    // terminate without errors
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain()