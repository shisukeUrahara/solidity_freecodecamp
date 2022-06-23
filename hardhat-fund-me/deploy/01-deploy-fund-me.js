const { network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

async function deployFunction({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const chainId = network.config.chainId
    console.log("**@ chainId deployment is , ", chainId)

    //  choose price feed address depending upon the chainId
    const ethUsdPriceFeedAddress =
        networkConfig[chainId]["ethUsdPriceFeedAddress"]

    // if network is local like hardhat ,. then deploy mock contracts

    // When using oracles for local hardhat network , we use mocks
    const fundMeContract = await deploy("FundMe", {
        from: deployer,
        args: [], // put price feed address here
        log: true,
    })
}

module.exports.default = deployFunction
