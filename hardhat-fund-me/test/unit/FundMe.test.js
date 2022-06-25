const { expect } = require("chai")
const { deployments, getNamedAccounts, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe local Contract", async () => {
          let fundMe
          let deployer
          let mockV3Aggregator
          let sendValue = ethers.utils.parseEther("1")

          beforeEach(async () => {
              // deploying contracts using hardhat deploy
              deployer = (await getNamedAccounts()).deployer
              //  using fixtures we can run the scripts in deploy folder to test our contracts
              await deployments.fixture(["all"])
              //  getting the contract deployed using the above statement
              fundMe = await ethers.getContract("FundMe", deployer)
              // console.log("**@ fundMe contract is , ", fundMe)
              mockV3Aggregator = await ethers.getContract(
                  "MockV3Aggregator",
                  deployer
              )
          })

          describe("Constructor", async () => {
              it("Should set the aggregator address correctly", async () => {
                  const contractMockV3AggregatorAddress =
                      await fundMe.getPriceFeed()
                  expect(contractMockV3AggregatorAddress).to.be.eq(
                      mockV3Aggregator.address
                  )
              })
          })

          describe("Fund Method", async () => {
              it("Should fail if minimum eth is not sent", async () => {
                  await expect(fundMe.fund()).to.be.revertedWith(
                      "You need to spend more ETH!"
                  )
              })

              it("Should update the data in contract on successfull fund", async () => {
                  await fundMe.fund({ value: sendValue })
                  let userBalance = await fundMe.getAddressToAmountFunded(
                      deployer
                  )

                  let userAddress = await fundMe.getFunder(0)

                  expect(userBalance.toString()).to.be.eq(sendValue)
                  expect(userAddress).to.be.eq(deployer)
              })
          })

          describe("Withdraw function ", async () => {
              beforeEach(async () => {
                  await fundMe.fund({ value: sendValue })
              })
              it("Should withdraw ETH from a single founder ", async () => {
                  // Arrange
                  const beforeFundMeBalance = await ethers.provider.getBalance(
                      fundMe.address
                  )
                  const beforeDeployerBalance =
                      await ethers.provider.getBalance(deployer)

                  // ACT
                  const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait(1)
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const gasCost = gasUsed.mul(effectiveGasPrice)

                  let afterFundMeBalance = await ethers.provider.getBalance(
                      fundMe.address
                  )
                  let afterDeployerBalance = await ethers.provider.getBalance(
                      deployer
                  )
                  // Assert
                  expect(afterFundMeBalance.toString()).to.be.eq("0")
                  expect(
                      beforeFundMeBalance.add(beforeDeployerBalance).toString()
                  ).to.be.eq(afterDeployerBalance.add(gasCost).toString())
              })
              it("Should not allow non-owner account to withdraw funds", async () => {
                  const accounts = await ethers.getSigners()
                  const attackerAccount = accounts[1]
                  const attackerConnectedContract = await fundMe.connect(
                      attackerAccount
                  )

                  await expect(
                      attackerConnectedContract.withdraw()
                  ).to.be.revertedWith("FundMe__NotOwner")
              })
          })
      })
