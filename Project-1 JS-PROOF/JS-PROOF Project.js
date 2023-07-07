console.log("JS-PROOF Project")

// create a variable to hold your NFT's
let nftCount = 0;
const nfts = [];

// this function will take in some values as parameters, create an
// NFT object using the parameters passed to it for its metadata, 
// and store it in the variable above.
function mintNFT(_name, _eyeColor, _shirtType, _bling) 
{
  const nft = 
  {
    'name': _name,
    'eyecolor': _eyeColor,
    'bling': _bling,
    'shirtType': _shirtType
  };
  nfts.push(nft);
  nftCount++;
  return nft;
}

// create a "loop" that will go through an "array" of NFT's
// and print their metadata with console.log()
function listNFTs() 
{
  for (let i = 0; i < nftCount; i++) 
  {
    const nft = nfts[i];
    console.log("\nID: \t\t"+(i+1));
    
    console.log("Name: \t\t" + nft.name);
    console.log("Eye Color: \t" + nft.eyecolor);
    console.log("Shirt Type: " + nft.shirtType);
    console.log("Bling: \t\t" + nft.bling);
    console.log("")
  }
}

// print the total number of NFTs we have minted to the console
function getTotalSupply() 
{
  return nftCount;
}

const nft1 = mintNFT("Bob", "Blue", "Hoodie", "Gold Chain");
const nft2 = mintNFT("Sue", "Yellow", "Shirt", "High Heels");
const nft3 = mintNFT("Tim", "Black", "Jacket", "Leather Belt");
const nft4 = mintNFT("Jogn", "Brown", "Suit", "Gold Watch");

// call your functions below this line
listNFTs();
console.log("total : " + getTotalSupply());
