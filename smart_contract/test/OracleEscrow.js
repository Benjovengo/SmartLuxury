const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Oracle Escrow', () => {
    // variables
    let buyer, seller, oracle
    let fashionProducts
    let oracleEscrow


    beforeEach(async () => {
        // Setup accounts - to get signers use `const signers = await ethers.getSigners()`
        [buyer, seller, oracle] = await ethers.getSigners()

        // Deploy FashionProducts
        const FashionProducts = await ethers.getContractFactory('FashionProducts')
        fashionProducts = await FashionProducts.deploy()

        // Mint
        let transaction = await fashionProducts.connect(seller).mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS")
        await transaction.wait()

        // Deploy OracleEscrow
        const OracleEscrow = await ethers.getContractFactory('OracleEscrow')
        oracleEscrow = await OracleEscrow.deploy(fashionProducts.address, oracle.address)

        // Seller approval
        transaction = await fashionProducts.connect(seller).approve(oracleEscrow.address, 1)
        await transaction.wait()

        // List product
        transaction = await oracleEscrow.connect(seller).list(1, tokens(10))
        await transaction.wait()
    })

    describe('Address', () => {
        it('Returns NFT address.', async () => {
            const result = await oracleEscrow.nftAddress()
            expect(result).that.be.equal(fashionProducts.address)
            // console.log(result)
        })
    })

    describe('Listing', () => {
        it('Updates ownership.', async () => {
            expect(await fashionProducts.ownerOf(1)).to.be.equal(oracleEscrow.address)
        })

        it('Updates as listed.', async () => {
            const result = await oracleEscrow.isListed(1)
            expect(result).that.be.equal(true)
        })

        it('Returns purchase price.', async () => {
            const result = await oracleEscrow.purchasePrice(1)
            expect(result).that.be.equal(tokens(10))
        })

    })

    describe('Deployment', () => {
        it('Updates escrow contract balance.', async () => {
            const transaction = await oracleEscrow.connect(buyer).depositEarnest(1, { value: tokens(10) })
            await transaction.wait()
            const result = await oracleEscrow.getBalance()
            expect(result).to.be.equal(tokens(10))
            // console.log(result)
        })

        it('Returns buyer.', async () => {
            const transaction = await oracleEscrow.connect(buyer).depositEarnest(1, { value: tokens(10) })
            await transaction.wait()
            const result = await oracleEscrow.buyer(1)
            expect(result).that.be.equal(buyer.address)
        })
    })

    describe('Oracle Inspection', () => {
        beforeEach(async () => {
            const transaction = await oracleEscrow.connect(oracle).updateDeliveryStatus(1, true)
            await transaction.wait()
        })

        it('Updates inspection status', async () => {
            const result = await oracleEscrow.wasDelivered(1)
            expect(result).to.be.equal(true)
        })
    })


    describe('Approval', () => {
        beforeEach(async () => {
            let transaction = await oracleEscrow.connect(buyer).approveSale(1)
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
            let transaction = await oracleEscrow.connect(buyer).depositEarnest(1, { value: tokens(10) })
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
            expect(await fashionProducts.ownerOf(1)).to.be.equal(buyer.address)
        })

        it('Updates oracle contract balance', async () => {
            expect(await oracleEscrow.getBalance()).to.be.equal(0)
        })
    })

})