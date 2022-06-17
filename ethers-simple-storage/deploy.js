const ethers = require("ethers");
const fs = require("fs");

async function main() {
  //  making a connection to the ganache blockchain
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  //  creating a wallet
  const wallet = new ethers.Wallet(
    "1848a4ae5d87ba54318ff66d41c2f0a86194c958ab40a6195df0c4b2eedd6eee",
    provider
  );

  //  importing contract abi and binary
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  //  making a factory object to deploy the contract
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("**@ DEPLOYING CONTRACT , ...");
  const contract = await contractFactory.deploy();
  console.log("**@ Contract deployed ");
  console.log("**@ Contract is , ", contract);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log("**@ deploy error , error is , ", err);
  });
