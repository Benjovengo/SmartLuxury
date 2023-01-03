/* Run
   npx hardhat run .\scripts\deploy.js --network goerli
*/
// We require the Hardhat Runtime Environment for running the script in a 
// standalone fashion through `node <script>`.
const hre = require("hardhat");
const fs = require("fs"); // to copy the files to be used by the web interface

const main = async () => {

  // Deploy TrackingOracle
  const TrackingOracle = await ethers.getContractFactory('TrackingOracle')
  const trackingOracle = await TrackingOracle.deploy()
  await trackingOracle.deployed()

  // Console Log results
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
    const sourceTrackingABI = "./artifacts/contracts/TrackingOracle.sol/TrackingOracle.json"
    const destinationFolder = "../work/TrackingOracle.json"
    copyABIFiles(sourceTrackingABI, destinationFolder)
    // terminate without errors
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain()