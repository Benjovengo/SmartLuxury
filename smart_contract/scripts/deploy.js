/* Run
   npx hardhat run .\scripts\deploy.js --network goerli
*/
// We require the Hardhat Runtime Environment for running the script in a 
// standalone fashion through `node <script>`.
const hre = require("hardhat");
const fs = require("fs"); // to copy the files to be used by the web interface

let fashionAddress
let oracleAddress
let trackingAddress

const main = async () => {
  /* Deployment Section */
  // Deploy ContactInfo
    
  // Deploy FashionProducts
  const FashionProducts = await ethers.getContractFactory('FashionProducts')
  const fashionProducts = await FashionProducts.deploy()
  await fashionProducts.deployed()
  fashionAddress = fashionProducts.address

  // Deploy TrackingOracle
  const TrackingOracle = await ethers.getContractFactory('TrackingOracle')
  const trackingOracle = await TrackingOracle.deploy()
  await trackingOracle.deployed()
  trackingAddress = trackingOracle.address

  // Deploy OracleEscrow
  const OracleEscrow = await ethers.getContractFactory('OracleEscrow')
  const oracleEscrow = await OracleEscrow.deploy(fashionProducts.address, trackingOracle.address)
  await oracleEscrow.deployed()
  oracleAddress = oracleEscrow.address

  /* Console Log results */
  console.log("FashionProducts address: ", fashionProducts.address)
  console.log("OracleEscrow address: ", oracleEscrow.address)
  console.log("TrackingOracle address: ", trackingOracle.address)
  console.log("ContactInfo address: ")
}

// Function to copy the ABI files
function copyABIFiles(_trackingABI, _destinationPath) {
  fs.copyFile(_trackingABI, _destinationPath, (err) => {
  if (err) throw err;
  console.log('ABI successfully copied to client-side application');
  })
}


// Function to create/ update config.json file
function createConfigJSON(_fashionAddress, _trackingAddress, _oracleAddress) {
  const configFilePath = "../client/config.json";

  // Create data JSON with contents
  var data = {}
  data[5] = []

  data[5] = {
    fashionProducts: {
      address: _fashionAddress
    },
    trackingOracle: {
      address: _trackingAddress
    },
    oracleEscrow: {
      address: _oracleAddress
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
    const fileNames = ['FashionProducts', 'OracleEscrow', 'TrackingOracle', 'ContactInfo']
    for (let i = 0; i < 3; i++) {
      sourceABI = "./artifacts/contracts/"+ fileNames[i] +".sol/" + fileNames[i] + ".json"
      destinationPath = "../client/abis/" + fileNames[i] + ".json"
      copyABIFiles(sourceABI, destinationPath)
    }
    // create config.json with deployed addresses
    createConfigJSON(fashionAddress, trackingAddress, oracleAddress)
    // terminate without errors
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain()