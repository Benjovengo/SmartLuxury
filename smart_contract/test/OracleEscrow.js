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

        it('Updates as listed.', async () => {
            // List product
            transaction = await oracleEscrow.connect(seller).list(1, tokens(10))
            await transaction.wait()
            const result = await oracleEscrow.isListed(1)
            expect(result).that.be.equal(true)
        })

        it('Returns purchase price.', async () => {
            // List product
            transaction = await oracleEscrow.connect(seller).list(1, tokens(10))
            await transaction.wait()
            const result = await oracleEscrow.purchasePrice(1)
            expect(result).that.be.equal(tokens(10))
        })
    })

    describe('Selling info', () => {
        it('Updates escrow contract balance.', async () => {
            // List product
            transaction = await oracleEscrow.connect(seller).list(1, tokens(10))
            await transaction.wait()
            transaction = await oracleEscrow.connect(buyer).depositEarnest(1, { value: tokens(10) })
            await transaction.wait()
            const result = await oracleEscrow.getBalance()
            expect(result).to.be.equal(tokens(10))
            // console.log(result)
        })
  
        it('Returns buyer.', async () => {
            // List product
            transaction = await oracleEscrow.connect(seller).list(1, tokens(10))
            await transaction.wait()
            transaction = await oracleEscrow.connect(buyer).depositEarnest(1, { value: tokens(10) })
            await transaction.wait()
            const result = await oracleEscrow.buyer(1)
            expect(result).that.be.equal(buyer.address)
        })
    })

    describe('Oracle Inspection', () => {
        beforeEach(async () => {
            // List product
            let transaction = await oracleEscrow.connect(seller).list(1, tokens(10))
            await transaction.wait()

            transaction = await oracleEscrow.connect(oracle).updateDeliveryStatus(1, true)
            await transaction.wait()
        })
  
        it('Updates inspection status', async () => {
            const result = await oracleEscrow.wasDelivered(1)
            expect(result).to.be.equal(true)
        })
    })

    describe('Approval', () => {
        beforeEach(async () => {
            let transaction = await oracleEscrow.connect(seller).list(1, tokens(10))
            await transaction.wait()
            
            transaction = await oracleEscrow.connect(buyer).approveSale(1)
            await transaction.wait()
  
            transaction = await oracleEscrow.connect(seller).approveSale(1)
            await transaction.wait()
  
            transaction = await oracleEscrow.connect(oracle).approveSale(1)
            await transaction.wait()
        })
  
        it('Updates approval status', async () => {
            expect(await oracleEscrow.approval(1, buyer.address)).to.be.equal(true)
            expect(await oracleEscrow.approval(1, seller.address)).to.be.equal(true)
            expect(await oracleEscrow.approval(1, oracle.address)).to.be.equal(true)
        })
    })

    describe('Sale', () => {
        beforeEach(async () => {
            let transaction = await oracleEscrow.connect(seller).list(1, tokens(10))
            await transaction.wait()
            
            transaction = await oracleEscrow.connect(buyer).depositEarnest(1, { value: tokens(10) })
            await transaction.wait()
  
            transaction = await oracleEscrow.connect(oracle).updateDeliveryStatus(1, true)
            await transaction.wait()
  
            transaction = await oracleEscrow.connect(buyer).approveSale(1)
            await transaction.wait()
  
            transaction = await oracleEscrow.connect(seller).approveSale(1)
            await transaction.wait()
  
            transaction = await oracleEscrow.connect(oracle).approveSale(1)
            await transaction.wait()
  
            await oracle.sendTransaction({ to: oracleEscrow.address, value: tokens(5) }) // here a lender can send ether to the contract
  
            transaction = await oracleEscrow.connect(seller).finalizeSale(1)
            await transaction.wait()
        })
  
        it('Updates ownership', async () => {
            expect(await fashionToken.ownerOf(1)).to.be.equal(buyer.address)
        })
  
        it('Get list of owners', async () => {
            let result = await fashionToken.getOwners(1)
            //console.log(result)
            expect(result[1]).to.be.equal(buyer.address)
        })
  
        it('Updates oracle contract balance', async () => {
            expect(await oracleEscrow.getBalance()).to.be.equal(0)
        })
    })
    
})

/*
console.log('Buyer:  ', buyer.address)
console.log('Seller: ',seller.address)
console.log('Oracle: ', oracleEscrow.address)
console.log('Token:  ', fashionToken.address)
*/