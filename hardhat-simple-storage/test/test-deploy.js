const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("SimpleStorage", async () => {
    let SimpleStorageFactory
    let SimpleStorage
    beforeEach(async () => {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        SimpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Should start with a value 0", async () => {
        const startValue = await SimpleStorage.retrieve()
        expect(startValue.toString()).to.be.eq("0")
    })

    it("should store the correct value", async () => {
        const expectedValue = "1"
        const storeTransaction = await SimpleStorage.store(expectedValue)
        await storeTransaction.wait(1)

        const currentValue = await SimpleStorage.retrieve()
        expect(currentValue.toString()).to.be.eq(expectedValue)
    })
})
