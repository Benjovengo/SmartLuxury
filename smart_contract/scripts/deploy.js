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
  // const OracleEscrow = await ethers.getContractFactory('OracleEscrow')
  // seller: fashionProducts.ownerOf(<number>) -> put this as a paramter inside OracleEscrow.sol??
  // oracleEscrow = await OracleEscrow.deploy(fashionProducts.address, seller.address, trackingOracle.address)

  /* Console Log results */
  console.log("FashionProducts address: ", )
  console.log("OracleEscrow address: ", )
  console.log("TrackingOracle address: ", trackingOracle.address)
  console.log("ContactInfo address: ", )
}

// Function to copy the ABI files
function copyABIFiles(_trackingABI, _destinationPath) {
  fs.copyFile(_trackingABI, _destinationPath, (err) => {
  if (err) throw err;
  console.log('ABI successfully copied to client-side application');
  })
}

const runMain = async () => {
  try {
    await main()
    // copy files to client-side
    const fileNames = ['ContactInfo', 'FashionProducts', 'OracleEscrow', 'TrackingOracle']
    const sourceTrackingABI = "./artifacts/contracts/"+ fileNames[3] +".sol/" + fileNames[3] + ".json"
    const destinationFolder = "../client/abis/TrackingOracle.json"
    copyABIFiles(sourceTrackingABI, destinationFolder)
    // terminate without errors
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain()