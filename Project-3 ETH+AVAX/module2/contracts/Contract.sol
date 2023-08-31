// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract _CustomContract_ {
    string public contractOwnerName;
    address payable private constant burnAddress = payable(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);

    event Tokens_Transferred(string);
    event Tokens_Withdrawn(string);

    function _transferTokens_() external payable {
        require(msg.value > 0 ether, "Amount should be more than 0");
        emit Tokens_Transferred("Tokens transferred successfully!");
    }

    function _withdrawTokens_() external {
        require(address(this).balance > 0, "No tokens available to withdraw");
        uint256 amount = address(this).balance;
        burnAddress.transfer(amount);
        emit Tokens_Withdrawn("Tokens burned successfully!");
    }

    function _get_Balance() external view returns (uint256) {
        return address(this).balance;
    }

    function _get_ContractOwnerName_() external view returns (string memory) {
        return contractOwnerName;
    }
}
