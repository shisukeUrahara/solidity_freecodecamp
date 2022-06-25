const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("**@ FUNDING CONTRACT ...")
    const transactionResponse = await fundMe.fund({
        value: ethers.utils.parseEther("1"),
    })
    await transactionResponse.wait(1)
    console.log("**@ Contract Funded ...")
}
// call the main function
main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error("**@ funding script error , ", err)
        process.exit(1)
    })
