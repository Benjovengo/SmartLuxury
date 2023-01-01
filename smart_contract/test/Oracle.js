const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n, toString(), 'ether')
}

describe('Oracle', () => {

    it('Saves the addresses.', async () => {
        const FashionProducts = await ethers.getContractFactory('FashionProducts')
        fashionProducts = await FashionProducts.deploy()

        console.log(fashionProducts.address)
    })
})