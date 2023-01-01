const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n, toString(), 'ether')
}

describe('Oracle Escrow', () => {
    // variables
    let buyer, seller
    let fashionProducts
    let oracleShipment


    beforeEach(async () => {
        // Setup accounts - to get signers use `const signers = await ethers.getSigners()`
        [buyer, seller] = await ethers.getSigners()

        // Deploy FashionProducts
        const FashionProducts = await ethers.getContractFactory('FashionProducts')
        fashionProducts = await FashionProducts.deploy()

        // Mint
        let transaction = await fashionProducts.connect(seller).mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS")
        await transaction.wait()

        // Deploy OracleShipment
        const OracleShipment = await ethers.getContractFactory('OracleShipment')
        oracleShipment = await OracleShipment.deploy(fashionProducts.address, seller.address)

        // Seller approval
        transaction = await fashionProducts.connect(seller).approve(oracleShipment.address, 1)
        await transaction.wait()

        // List product
        transaction = await oracleShipment.connect(seller).list(1)
        await transaction.wait()
    })

    describe('Deployment', () => {
        it('Returns NFT address.', async () => {
            const result = await oracleShipment.nftAddress()
            expect(result).that.be.equal(fashionProducts.address)
            // console.log(result)
        })

        it('Returns the seller address.', async () => {
            const result = await oracleShipment.seller()
            expect(result).that.be.equal(seller.address)
            // console.log(result)
        })
    })

    describe('Listing', () => {
        it('Updates ownership.', async () => {
            expect(await fashionProducts.ownerOf(1)).to.be.equal(oracleShipment.address)
        })
    })

})