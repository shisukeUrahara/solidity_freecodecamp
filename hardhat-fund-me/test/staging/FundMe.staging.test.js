const { getNamedAccounts, ethers, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { expect } = require("chai")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe Staging Contract", async () => {
          let fundMe
          let deployer
          let sendValue = ethers.utils.parseEther("1")

          beforeEach(async () => {
              // deploying contracts using hardhat deploy
              deployer = (await getNamedAccounts()).deployer
              //  using fixtures we can run the scripts in deploy folder to test our contracts
              //   await deployments.fixture(["fundme"])
              //  getting the contract deployed using the above statement
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allows people to fund and withdraw", async function () {
              const transactionResponse = await fundMe.fund({
                  value: sendValue,
              })
              await transactionResponse.wait(1)
              const withdrawTransactionResponse = await fundMe.withdraw({
                  gasLimit: 100000,
              })

              await withdrawTransactionResponse.wait(1)

              const endingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              console.log(
                  endingFundMeBalance.toString() +
                      " should equal 0, running assert equal..."
              )
              expect(endingFundMeBalance.toString()).to.be.eq("0")
          })
      })
