const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}
describe('Deployment and First Steps', () => {
    // variables
    let deployer, account01

    it('Change owner.', async () => {
        [deployer, account01] = await ethers.getSigners()

        // deploy
        const FashionToken = await ethers.getContractFactory('FashionToken')
        const fashionToken = await FashionToken.deploy()

        // change owner
        await fashionToken.connect(deployer).changeOwner(account01.address)

      console.log('Deployer:  ', deployer.address)
      console.log('Account01: ', account01.address)

      result = await fashionToken.owner()
      expect(result).to.be.equal(account01.address)
    })
    
})