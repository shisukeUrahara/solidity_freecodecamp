const { LogDescription } = require("ethers/lib/utils")
const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

const deployFunction = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const chainId = network.config.chainId
    // console.log("**@ chainId mocks is , ", chainId)

    if (developmentChains.includes(network.name)) {
        log("Local network detected , deploying mocks")
        await deploy("MockV3Aggregator", {
            from: deployer,
            args: [DECIMALS, INITIAL_ANSWER], // put price feed address here
            log: true,
        })

        log("Mocks Deployed")
        log(
            "------------------------------------------------------------------------------"
        )
    }
}
module.exports = deployFunction
module.exports.tags = ["all", "mocks"]
