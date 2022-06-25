const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("**@ WITHDRAWING FROM CONTRACT ...")
    const transactionResponse = await fundMe.withdraw({})
    await transactionResponse.wait(1)
    console.log("**@ Contract FUND WITHDRAWN ...")
}
// call the main function
main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error("**@ withdraw script error , ", err)
        process.exit(1)
    })
