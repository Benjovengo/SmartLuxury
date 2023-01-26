const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Contracts', () => {
  // variables
  let deployer, account01
  let fashionToken
  let sellingContract
  let contacts

  beforeEach(async () => {
    // Setup accounts - to get signers use `const signers = await ethers.getSigners()`
    [deployer, buyer, seller, oracle] = await ethers.getSigners()

    // Deploy FashionToken
    const FashionToken = await ethers.getContractFactory('FashionToken')
    fashionToken = await FashionToken.deploy()

    // Deploy Contacts
    const Contacts = await ethers.getContractFactory('Contacts')
    contacts = await Contacts.deploy()

    // Deploy SellingContract
    const SellingContract = await ethers.getContractFactory('SellingContract')
    sellingContract = await SellingContract.deploy(fashionToken.address, contacts.address, oracle.address)

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
      expect(result).to.be.equal(fashionToken.address)
    })

    it('Add and get account info.', async () => {
      await contacts.addAccount('Fabio', 'Pereira Benjovengo', 'https://github.com/Benjovengo/SmartLuxury/raw/master/client/src/assets/images/ava-01.png' ,'fabio.benjovengo@gmail.com', 'SHIS QI 26, Chácara 18 - Casa B', 71670740)
      let result = await contacts.getCustomerInfo(deployer.address)
      expect(result.firstName).to.be.equal('Fabio')
    })

   it('Add items to list.', async () => {
      await contacts.addCustomerItems(deployer.address,1);
      await contacts.addCustomerItems(deployer.address,5);
      let result = await contacts.getOwned(deployer.address);
      result = result.map(x => x.toNumber())
      expect(result).to.eql([1, 5])
    })
  })
})