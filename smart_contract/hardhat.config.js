require("@nomicfoundation/hardhat-toolbox")
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/5Z28yMrHkUYPHuwdYFNZmQjFo3H5BzWc',
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
