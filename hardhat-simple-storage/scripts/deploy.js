//  imports
const { ethers, run, network } = require("hardhat")

// main function
async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    const SimpleStorage = await simpleStorageFactory.deploy()
    await SimpleStorage.deployed()

    console.log("**@ DEPLOYING CONTRACTS")

    console.log(
        "**@ the simple storage contract deployed is , ",
        SimpleStorage.address
    )

    // console.log("**@ network config is , ", network.config)
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        await SimpleStorage.deployTransaction.wait(6)
        await verify(SimpleStorage.address, [])
    }
}

async function verify(contractAddress, args) {
    console.log("**@ VERIFYING CONTRACTS...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })

        console.log("**@ Contract verified")
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("**@ ALREADY VERIFIED CONTRACT ")
        } else {
            console.log(error)
        }
    }
}

// call the main function
main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error("**@ deployment error , ", err)
        process.exit(1)
    })
