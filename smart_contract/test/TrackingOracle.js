const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Tracking Oracle', () => {
  // variables

  /* Before each test */
  beforeEach(async () => {
    // Setup
    
    
  })

  /* Tests */
  it('Returns ETH price in USD.', async () => {
    let signers = await ethers.getSigners()
    let oracle = signers[2]

    console.log(oracle.address)
  })
})