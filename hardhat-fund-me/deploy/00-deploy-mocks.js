const { network } = require("hardhat")

const deployFunction = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const chainId = network.config.chainId
    console.log("**@ chainId deployment is , ", chainId)
}
module.exports = deployFunction
