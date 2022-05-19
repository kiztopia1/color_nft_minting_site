const { assert } = require('chai');

const Color = artifacts.require('Color')
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract("Color", (accounts) => {
    let contract;
    before(async () => {
        contract = await Color.deployed();
    })

    describe("minting", async () => {
        // it('create a new token', async () => {
        //     const result = await contract.mint('#FFFFFF')
        // })
    })
})