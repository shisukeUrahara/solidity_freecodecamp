const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

async function deployFunction({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const chainId = network.config.chainId
    // console.log("**@ chainId deployment is , ", chainId)

    //  choose price feed address depending upon the chainId
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress =
            networkConfig[chainId]["ethUsdPriceFeedAddress"]
    }

    const args = [ethUsdPriceFeedAddress]

    // if network is local like hardhat ,. then deploy mock contracts

    // When using oracles for local hardhat network , we use mocks
    const fundMeContract = await deploy("FundMe", {
        from: deployer,
        args: args, // put price feed address here
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    //  Verifying contracts if they are not deployed on local or hardhat network
    if (!developmentChains.includes(network.name)) {
        await verify(fundMeContract.address, args)
    }

    log(
        "--------------------------------------------------------------------------------"
    )
}

module.exports = deployFunction
module.exports.tags = ["all", "fundme"]
