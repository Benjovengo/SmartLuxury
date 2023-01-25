const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Tracking Oracle', () => {
  // variables
  let deployer, account01
  let fashionToken
  let sellingEscrow
  let contacts
  let trackingOracle

  beforeEach(async () => {
    // Setup accounts - to get signers use `const signers = await ethers.getSigners()`
    [deployer, buyer, seller, account01] = await ethers.getSigners()

    // Deploy FashionToken
    const FashionToken = await ethers.getContractFactory('FashionToken')
    fashionToken = await FashionToken.deploy()

    // Deploy Contacts
    const Contacts = await ethers.getContractFactory('Contacts')
    contacts = await Contacts.deploy()

    // Deploy TrackingOracle
    const TrackingOracle = await ethers.getContractFactory('TrackingOracle')
    trackingOracle = await TrackingOracle.deploy()

    // Deploy SellingEscrow
    const SellingEscrow = await ethers.getContractFactory('SellingEscrow')
    sellingEscrow = await SellingEscrow.deploy(fashionToken.address, contacts.address, trackingOracle.address)

    // change owner
    fashionToken.changeOwner(sellingEscrow.address)

    // Mint
    let transaction = await sellingEscrow.connect(seller).register("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS", "IA002000128")
    await transaction.wait()

    // Seller approval
    transaction = await fashionToken.connect(seller).approve(sellingEscrow.address, 1)
    await transaction.wait()
  })

  describe('Deployment and First Steps', () => {
    it('Has an address.', async () => {
      const result = await trackingOracle.address
      expect(result).to.not.equal(null)
      expect(result).to.not.equal(undefined)
      expect(result).to.not.equal('')
      expect(result).to.not.equal('0x')
    })

  })

})