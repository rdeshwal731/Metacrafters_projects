// Import necessary packages and contracts
const { ethers } = require("hardhat");
const  FXRootContractAbi  = require('../FXRootContractAbi.json');
const ABI = require('../artifacts/contracts/NFT.sol/NFT.json');
require('dotenv').config();

//Transfer ERC721A tokens to the Ethereum FxChain network
async function main() {

  // Set up connections to network and wallet
  const networkAddress = 'https://ethereum-goerli.publicnode.com';
  const privateKey = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  // Create a wallet instance
  const wallet = new ethers.Wallet(privateKey, provider);

  // Get the signer instance
  const [signer] = await ethers.getSigners();

  // Get ERC721A contract instance
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.attach('0x02dcC4C446e1EC657a99F4c91c63d1b8ffe381F4');

  // Get FXRoot contract instance
  const fxRootAddress = '0xF9bc4a80464E48369303196645e876c8C7D972de';
  const fxRoot = await ethers.getContractAt(FXRootContractAbi, fxRootAddress);

  // NFTIds to transfer
  const tokenIds = [0, 1, 2, 3, 4]; 

  // Approve the nfts for transfer
  const approve = await nft.connect(signer).setApprovalForAll(fxRootAddress, true);
  await approve.wait();
  console.log('Tokens for Bridging Tokens initiated. ');

  // Deposit the nfts to the FXRoot contracts
  for (let i = 0; i < tokenIds; i++) {
    const deposit = await fxRoot.connect(signer).deposit(
      nft.address,
      wallet.address, 
      tokenIds[i],
      '0x6566'
    );

    // Wait for the deposit to be confirmed
    await deposit.wait();
  }

  console.log("Bridging throygh FXPORTAL Approved and deposited");

  
  // Test balanceOf
  const balance = await nft.balanceOf(wallet.address);

  // Print the balance of the wallet
  console.log("Your wallet containing NFT haa the balance of:", balance.toString());
}


// Call the main function and handle any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
