const { expect } = require('chai');
const { ethers } = require('hardhat');


describe('Selling Escrow', () => {
    // variables
    let deployer, account01
    let fashionToken

    it('Change owner.', async () => {
        // Setup accounts - to get signers use `const signers = await ethers.getSigners()`
        [deployer, account01] = await ethers.getSigners()

        // Deploy SellingEscrow
        const FashionToken = await ethers.getContractFactory('FashionToken')
        fashionToken = await FashionToken.deploy()

        // change owner
        await fashionToken.connect(deployer).changeOwner(account01.address)

        expect(fashionToken.address).to.be.equal(account01.address)
    })

    
})