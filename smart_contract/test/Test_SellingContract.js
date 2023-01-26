const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Selling Escrow', () => {
  // variables
  let deployer, account01
  let fashionToken
  let sellingContract
  let contacts

  beforeEach(async () => {
    // Setup accounts - to get signers use `const signers = await ethers.getSigners()`
    [deployer, buyer, seller, shipping] = await ethers.getSigners()

    // Deploy SellingContract
    const FashionToken = await ethers.getContractFactory('FashionToken')
    fashionToken = await FashionToken.deploy()

    // Deploy Contacts
    const Contacts = await ethers.getContractFactory('Contacts')
    contacts = await Contacts.deploy()

    // Deploy SellingContract
    const SellingContract = await ethers.getContractFactory('SellingContract')
    sellingContract = await SellingContract.deploy(fashionToken.address, contacts.address, shipping.address)

    // change owner
    fashionToken.changeOwner(sellingContract.address)

    // Mint
    let transaction = await sellingContract.connect(seller).register("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS", "IA002000128")
    await transaction.wait()

    // Seller approval
    transaction = await fashionToken.connect(seller).approve(sellingContract.address, 1)
    await transaction.wait()

  })

  describe('Deployment and First Steps', () => {
    it('Address.', async () => {
      const result = await sellingContract.nftAddress()
      expect(result).that.be.equal(fashionToken.address)
    })

    it('Change ownership.', async () => {
      result = await fashionToken.owner()
      expect(result).to.be.equal(sellingContract.address)
    })

    it('Create NFT.', async () => {
      const result = await fashionToken.connect(seller).ownerOf(1)
      expect(result).that.be.equal(seller.address)
    })  
  })

  describe('Listing', () => {
    it('Transfer ownership to escrow.', async () => {
        // List product
        transaction = await sellingContract.connect(seller).list(1, tokens(10))
        await transaction.wait()
        expect(await fashionToken.ownerOf(1)).to.be.equal(sellingContract.address)
    })

    it('Updates as listed.', async () => {
      // List product
      transaction = await sellingContract.connect(seller).list(1, tokens(10))
      await transaction.wait()
      const result = await sellingContract.isListed(1)
      expect(result).that.be.equal(true)
    })

    it('Unlist an item.', async () => {
      // List product
      transaction = await sellingContract.connect(seller).list(1, tokens(10))
      await transaction.wait()
      transaction = await sellingContract.connect(seller).approveTransfer(1)
      await transaction.wait()
      transaction = await sellingContract.connect(seller).unlist(1)
      await transaction.wait()
      const result = await sellingContract.isListed(1)
      expect(await fashionToken.ownerOf(1)).to.be.equal(seller.address)
      expect(result).to.be.equal(false)
    })

    it('Returns purchase price.', async () => {
      // List product
      transaction = await sellingContract.connect(seller).list(1, tokens(10))
      await transaction.wait()
      const result = await sellingContract.purchasePrice(1)
      expect(result).to.be.equal(tokens(10))
    })
  })

  describe('Selling info', () => {
    it('Updates escrow contract balance.', async () => {
      // List product
      transaction = await sellingContract.connect(seller).list(1, tokens(10))
      await transaction.wait()
      transaction = await sellingContract.connect(buyer).depositEarnest(1, { value: tokens(10) })
      await transaction.wait()
      const result = await sellingContract.getBalance()
      expect(result).to.be.equal(tokens(10))
      // console.log(result)
    })

    it('Returns buyer.', async () => {
      // List product
      transaction = await sellingContract.connect(seller).list(1, tokens(10))
      await transaction.wait()
      transaction = await sellingContract.connect(buyer).depositEarnest(1, { value: tokens(10) })
      await transaction.wait()
      const result = await sellingContract.buyer(1)
      expect(result).that.be.equal(buyer.address)
    })
  })

  describe('Oracle Inspection', () => {
    beforeEach(async () => {
      // List product
      let transaction = await sellingContract.connect(seller).list(1, tokens(10))
      await transaction.wait()

      transaction = await sellingContract.connect(shipping).updateDeliveryStatus(1, true)
        await transaction.wait()
    })

    it('Updates inspection status', async () => {
      const result = await sellingContract.wasDelivered(1)
      expect(result).to.be.equal(true)
    })
  })

  describe('Approval', () => {
    beforeEach(async () => {
      let transaction = await sellingContract.connect(seller).list(1, tokens(10))
      await transaction.wait()

      transaction = await sellingContract.connect(shipping).approveSale(1)
      await transaction.wait()
    })

    it('Updates approval status', async () => {
      console.log('VerifiedContacts has to call it!')
      //expect(await sellingContract.approval(1, buyer.address)).to.be.equal(true)
      //expect(await sellingContract.approval(1, seller.address)).to.be.equal(true)
      //expect(await sellingContract.approval(1, shipping.address)).to.be.equal(true)
    })
  })

  describe('Sale', () => {
    beforeEach(async () => {
      let transaction = await sellingContract.connect(seller).list(1, tokens(10))
      await transaction.wait()
      
      transaction = await sellingContract.connect(buyer).depositEarnest(1, { value: tokens(10) })
      await transaction.wait()

      transaction = await sellingContract.connect(shipping).updateDeliveryStatus(1, true)
      await transaction.wait()

      transaction = await sellingContract.connect(shipping).approveSale(1)
      await transaction.wait()

      await shipping.sendTransaction({ to: sellingContract.address, value: tokens(5) }) // here a lender can send ether to the contract

      try {
        transaction = await sellingContract.connect(seller).finalizeSale(1)
        await transaction.wait() 
      } catch (error) {
        console.log(error)
      }
    })

    it('Updates ownership', async () => {
      expect(await fashionToken.ownerOf(1)).to.be.equal(buyer.address)
    })

    it('Updates shipping contract balance', async () => {
      let result = await sellingContract.getBalance()
      console.log(result)
      //expect(result).to.be.equal(tokens(0.75))
    })
  })



})