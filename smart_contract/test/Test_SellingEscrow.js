const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Selling Escrow', () => {
  // variables
  let deployer, account01
  let fashionToken
  let sellingEscrow
  let contacts

  beforeEach(async () => {
    // Setup accounts - to get signers use `const signers = await ethers.getSigners()`
    [deployer, buyer, seller, oracle] = await ethers.getSigners()

    // Deploy SellingEscrow
    const FashionToken = await ethers.getContractFactory('FashionToken')
    fashionToken = await FashionToken.deploy()

    // Deploy Contacts
    const Contacts = await ethers.getContractFactory('Contacts')
    contacts = await Contacts.deploy()

    // Deploy SellingEscrow
    const SellingEscrow = await ethers.getContractFactory('SellingEscrow')
    sellingEscrow = await SellingEscrow.deploy(fashionToken.address, contacts.address, oracle.address)

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
    it('Address.', async () => {
      const result = await sellingEscrow.nftAddress()
      expect(result).that.be.equal(fashionToken.address)
    })

    it('Change ownership.', async () => {
      result = await fashionToken.owner()
      expect(result).to.be.equal(sellingEscrow.address)
    })

    it('Create NFT.', async () => {
      const result = await fashionToken.connect(seller).ownerOf(1)
      expect(result).that.be.equal(seller.address)
    })  
  })

  describe('Listing', () => {
    it('Transfer ownership to escrow.', async () => {
        // List product
        transaction = await sellingEscrow.connect(seller).list(1, tokens(10))
        await transaction.wait()
        expect(await fashionToken.ownerOf(1)).to.be.equal(sellingEscrow.address)
    })

    it('Updates as listed.', async () => {
      // List product
      transaction = await sellingEscrow.connect(seller).list(1, tokens(10))
      await transaction.wait()
      const result = await sellingEscrow.isListed(1)
      expect(result).that.be.equal(true)
    })

    it('Unlist an item.', async () => {
      // List product
      transaction = await sellingEscrow.connect(seller).list(1, tokens(10))
      await transaction.wait()
      transaction = await sellingEscrow.connect(seller).approveTransfer(1)
      await transaction.wait()
      transaction = await sellingEscrow.connect(seller).unlist(1)
      const result = await sellingEscrow.isListed(1)
      expect(await fashionToken.ownerOf(1)).to.be.equal(seller.address)
      expect(result).to.be.equal(false)
    })

    it('Returns purchase price.', async () => {
      // List product
      transaction = await sellingEscrow.connect(seller).list(1, tokens(10))
      await transaction.wait()
      const result = await sellingEscrow.purchasePrice(1)
      expect(result).to.be.equal(tokens(10))
    })
  })

  describe('Selling info', () => {
    it('Updates escrow contract balance.', async () => {
      // List product
      transaction = await sellingEscrow.connect(seller).list(1, tokens(10))
      await transaction.wait()
      transaction = await sellingEscrow.connect(buyer).depositEarnest(1, { value: tokens(10) })
      await transaction.wait()
      const result = await sellingEscrow.getBalance()
      expect(result).to.be.equal(tokens(10))
      // console.log(result)
    })

    it('Returns buyer.', async () => {
      // List product
      transaction = await sellingEscrow.connect(seller).list(1, tokens(10))
      await transaction.wait()
      transaction = await sellingEscrow.connect(buyer).depositEarnest(1, { value: tokens(10) })
      await transaction.wait()
      const result = await sellingEscrow.buyer(1)
      expect(result).that.be.equal(buyer.address)
    })
  })

  describe('Oracle Inspection', () => {
    beforeEach(async () => {
      // List product
      let transaction = await sellingEscrow.connect(seller).list(1, tokens(10))
      await transaction.wait()

      transaction = await sellingEscrow.connect(oracle).updateDeliveryStatus(1, true)
        await transaction.wait()
    })

    it('Updates inspection status', async () => {
      const result = await sellingEscrow.wasDelivered(1)
      expect(result).to.be.equal(true)
    })
  })

  describe('Approval', () => {
    beforeEach(async () => {
      let transaction = await sellingEscrow.connect(seller).list(1, tokens(10))
      await transaction.wait()
      
      transaction = await sellingEscrow.connect(buyer).approveSale(1)
      await transaction.wait()

      transaction = await sellingEscrow.connect(seller).approveSale(1)
      await transaction.wait()

      transaction = await sellingEscrow.connect(oracle).approveSale(1)
      await transaction.wait()
    })

    it('Updates approval status', async () => {
      expect(await sellingEscrow.approval(1, buyer.address)).to.be.equal(true)
      expect(await sellingEscrow.approval(1, seller.address)).to.be.equal(true)
      expect(await sellingEscrow.approval(1, oracle.address)).to.be.equal(true)
    })
  })

  describe('Sale', () => {
    beforeEach(async () => {
      let transaction = await sellingEscrow.connect(seller).list(1, tokens(10))
      await transaction.wait()
      
      transaction = await sellingEscrow.connect(buyer).depositEarnest(1, { value: tokens(10) })
      await transaction.wait()

      transaction = await sellingEscrow.connect(oracle).updateDeliveryStatus(1, true)
      await transaction.wait()

      transaction = await sellingEscrow.connect(buyer).approveSale(1)
      await transaction.wait()

      transaction = await sellingEscrow.connect(seller).approveSale(1)
      await transaction.wait()

      transaction = await sellingEscrow.connect(oracle).approveSale(1)
      await transaction.wait()

      await oracle.sendTransaction({ to: sellingEscrow.address, value: tokens(5) }) // here a lender can send ether to the contract

      transaction = await sellingEscrow.connect(seller).finalizeSale(1)
      await transaction.wait()
    })

    it('Updates ownership', async () => {
      expect(await fashionToken.ownerOf(1)).to.be.equal(buyer.address)
    })

    it('Updates oracle contract balance', async () => {
      expect(await sellingEscrow.getBalance()).to.be.equal(tokens(0.75))
    })
  })



})