const { task } = require("hardhat/config")

task("block-number", "Prints latest block number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log("**@ Current block number is , ", blockNumber)
    }
)
