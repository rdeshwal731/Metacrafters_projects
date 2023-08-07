// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

interface IERC20 
{
    function tot_Supp() external view returns (uint);
    function balance_Of(address account) external view returns (uint);
    function transfer_Tokens_(address recipient, uint amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint amount);
}

contract ERC20 is IERC20 
{
    address public owner;
    uint private _tot_Supply;
    mapping (address => uint) public balance_Of_;


    constructor() 
    {
        owner = msg.sender;
        _tot_Supply = 0;
    }


    modifier Owner_only 
    {

        require(msg.sender == owner, "This function can only be executed by Owner");
        _;
    }

    string public constant name = "Vision";
    string public constant symbol = "VS";
    uint8 public constant decimals = 18;

    
    
    function transfer_Tokens_(address recipient, uint amount) external returns (bool) 
    {
        require(balance_Of_[msg.sender] >= amount, "Insufficient balance is found");

        balance_Of_[msg.sender] -= amount;
        balance_Of_[recipient] += amount;

        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    
    
    function _mint_Tokens(uint amount) external Owner_only 
    {
        balance_Of_[msg.sender] += amount;
        _tot_Supply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    
   
    function _burn_Tokens(uint amount) external Owner_only 
    {
        require(amount > 0, "Try amount other than zero");
        require(balance_Of_[msg.sender] >= amount, "Insufficient balance");
        balance_Of_[msg.sender] -= amount;
        _tot_Supply -= amount;

        emit Transfer(msg.sender, address(0), amount);
    }

    function tot_Supp() external view override returns (uint) 
    {
        return _tot_Supply;
    }

}
