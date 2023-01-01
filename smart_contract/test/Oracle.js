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

    it('Saves the addresses.', async () => {

        // Get Signers
        // const signers = await ethers.getSigners()
        
        // Setup accounts
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

        const result = await oracleShipment.nftAddress()
        expect(result).that.be.equal(fashionProducts.address)

        const resultSeller = await oracleShipment.seller()
        expect(resultSeller).that.be.equal(seller.address)

        console.log(result)
    })
})