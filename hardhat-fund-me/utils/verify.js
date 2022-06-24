const { ethers, run, network } = require("hardhat")
const { modules } = require("web3")
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

module.exports = { verify }
