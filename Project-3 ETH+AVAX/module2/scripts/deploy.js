const { ethers } = require("hardhat");

async function main() {
  // Get the ContractFactory and Signer accounts
  const ContractFactory = await ethers.getContractFactory("CustomContract");
  const [deployer] = await ethers.getSigners();

  // Deploy the contract
  console.log("Deploying Contract...");
  const contract = await ContractFactory.deploy();

  // Wait for the contract to be mined
  await contract.waitForDeployment();

  console.log(`Deployer's address: ${deployer.address}`);

  console.log("Contract deployed to:", contract.target);
}

// Run the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });