/* Run
   npx hardhat run .\scripts\deploy.js --network goerli
*/
// We require the Hardhat Runtime Environment for running the script in a 
// standalone fashion through `node <script>`.
const hre = require("hardhat");
const fs = require("fs"); // to copy the files to be used by the web interface

let fashionAddress
let sellingAddress
let trackingAddress

const main = async () => {
  /* Deployment Section */
  // Deploy ContactInfo
    
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

  /* Console Log results */
  console.log("FashionToken address:   ", fashionToken.address)
  console.log("SellingEscrow address:  ", sellingEscrow.address)
  console.log("TrackingOracle address: ", trackingOracle.address)
  console.log("ContactInfo address:    ")
}

// Function to copy the ABI files
function copyABIFiles(_trackingABI, _destinationPath) {
  fs.copyFile(_trackingABI, _destinationPath, (err) => {
  if (err) throw err;
  console.log('ABI successfully copied to client-side application');
  })
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
    const fileNames = ['FashionToken', 'SellingEscrow', 'TrackingOracle', 'ContactInfo']
    for (let i = 0; i < 3; i++) {
      sourceABI = "./artifacts/contracts/"+ fileNames[i] +".sol/" + fileNames[i] + ".json"
      destinationPath = "../client/src/abis/" + fileNames[i] + ".json"
      copyABIFiles(sourceABI, destinationPath)
    }
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