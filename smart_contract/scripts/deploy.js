/* Run
   npx hardhat run .\scripts\deploy.js --network goerli
*/
// We require the Hardhat Runtime Environment for running the script in a 
// standalone fashion through `node <script>`.
const hre = require("hardhat");
const fs = require("fs"); // to copy the files to be used by the web interface

const main = async () => {
  /* Deployment Section */
  // Deploy ContactInfo
    
  // Deploy FashionProducts
  const FashionProducts = await ethers.getContractFactory('FashionProducts')
  const fashionProducts = await FashionProducts.deploy()
  await fashionProducts.deployed()

  // Deploy TrackingOracle
  const TrackingOracle = await ethers.getContractFactory('TrackingOracle')
  const trackingOracle = await TrackingOracle.deploy()
  await trackingOracle.deployed()

  // Deploy OracleEscrow
  const OracleEscrow = await ethers.getContractFactory('OracleEscrow')
  oracleEscrow = await OracleEscrow.deploy(fashionProducts.address, trackingOracle.address)
  await oracleEscrow.deployed()

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
    // terminate without errors
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain()