const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Oracle Escrow', () => {
    // variables
    let buyer, seller, oracle
    let fashionToken
    let oracleEscrow


    beforeEach(async () => {
        // Setup accounts - to get signers use `const signers = await ethers.getSigners()`
        [deployer, buyer, seller, oracle] = await ethers.getSigners()

        // Deploy OracleEscrow
        const FashionToken = await ethers.getContractFactory('FashionProducts')
        fashionToken = await FashionToken.deploy()

        // Deploy OracleEscrow
        const OracleEscrow = await ethers.getContractFactory('OracleEscrow')
        oracleEscrow = await OracleEscrow.deploy(fashionToken.address, oracle.address)

        // change owner
        fashionToken.changeOwner(oracleEscrow.address)



         // Mint
         let transaction = await oracleEscrow.connect(seller).register("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS")
         await transaction.wait()

        // Seller approval
        transaction = await fashionToken.connect(seller).approve(oracleEscrow.address, 1)
        await transaction.wait()

    })

    describe('Deployment', () => {

        it('Address.', async () => {
            const result = await oracleEscrow.nftAddress()
            expect(result).that.be.equal(fashionToken.address)
        })

        it('Escrow owns the token.', async () => {
            const result = await fashionToken.owner()
            expect(result).that.be.equal(oracleEscrow.address)
        })

        it('Create NFT.', async () => {
            const result = await fashionToken.connect(seller).ownerOf(1)
            expect(result).that.be.equal(seller.address)
        })
    
    })

    describe('Listing', () => {

        it('Transfer ownership to escrow.', async () => {
            // List product
            transaction = await oracleEscrow.connect(seller).list(1, tokens(10))
            await transaction.wait()
            expect(await fashionToken.ownerOf(1)).to.be.equal(oracleEscrow.address)
        })

    })
    
})

/*
console.log('Buyer:  ', buyer.address)
console.log('Seller: ',seller.address)
console.log('Oracle: ', oracleEscrow.address)
console.log('Token:  ', fashionToken.address)
*/