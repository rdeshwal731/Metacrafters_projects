// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "erc721a/contracts/ERC721A.sol";

contract NFT is ERC721A {
    address public owner;

    // Base url for the nfts
    string baseUrl =
        "https://gateway.pinata.cloud/ipfs/QmeYgZv52SbbXEa375UozQSg2MyyoJbsHShSXfKi4JDJEd/?_gl=1*kjgzs5*_ga*ODA5NDM3NTIxLjE2ODk2NTI4NzQ.*_ga_5RMPXG14TE*MTY5MDMxMDY3NS4zLjEuMTY5MDMxMDcyOC43LjAuMA..";

    //  for the prompt description
    string[] public description ;
    constructor() ERC721A("AINFT", "AFT") {
        owner = msg.sender;
    }

    // Modifier that only allows the owner to execute a function
    modifier ownerAllowed() {
        require(msg.sender == owner, "Only owner can perform this action!");
        _;
    }

    function promptUsed()public {
        description.push("A future city in neon light");
        description.push("Pshychadelic color pattern");
        description.push("A whale boat in front of giant moon");
        description.push("Breathing white baby dragon");
        description.push("A Dragon");
    }
    // Function to mint NFT which only owner can perform
    function mint(uint256 quantity) external payable ownerAllowed() {
        require(quantity <= 5,"only 5 nfts to be minted");
            
        _mint(msg.sender, quantity);
    }

    // Override the baseURI function to return the base URL for the NFTs
    function _baseURI() internal view override returns (string memory) {
        return baseUrl;
    }

    // Return the URL for the prompt description
    function promptDescription() external view returns (string[] memory) {
        return description;
    }
}
