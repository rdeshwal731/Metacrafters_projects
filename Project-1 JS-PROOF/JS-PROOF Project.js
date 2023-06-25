// create a variable to hold your NFT's
let numNFTs = 0;

// this function will take in some values as parameters, create an
// NFT object using the parameters passed to it for its metadata, 
// and store it in the variable above.
function mintNFT(name, artist, description) 
{
  const nft = 
  {
    name: name,
    artist: artist,
    description: description
  };
  
  numNFTs++;
  return nft;
}

// create a "loop" that will go through an "array" of NFT's
// and print their metadata with console.log()
function listNFTs() 
{
  // You can create an array of NFTs and loop through it
  const nfts = 
  [
    mintNFT("NFT 1", "Artist 1", "Description 1"),
    mintNFT("NFT 2", "Artist 2", "Description 2"),
    mintNFT("NFT 3", "Artist 3", "Description 3")
  ];
  
  for (let i = 0; i < nfts.length; i++) 
  {
    const nft = nfts[i];
    console.log("Name: " + nft.name);
    console.log("Artist: " + nft.artist);
    console.log("Description: " + nft.description);
    console.log("-------------------------");
  }
}

// print the total number of NFTs we have minted to the console
function getTotalSupply() 
{
  console.log("Total Supply: " + numNFTs);
}

// call your functions below this line
mintNFT("NFT 4", "Artist 4", "Description 4");
listNFTs();
getTotalSupply();

/*
In this example, the numNFTs variable is used to hold the number of NFTs created. 
The mintNFT function creates an NFT object using the parameters passed to it and increments the numNFTs variable. 
The listNFTs function uses a loop to iterate over an array of NFTs and prints their metadata to the console.
The getTotalSupply function simply prints the total number of NFTs created. 
Finally, the functions are called at the end to test the implementation.
*/