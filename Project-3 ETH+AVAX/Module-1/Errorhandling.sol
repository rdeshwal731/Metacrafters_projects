// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Simpleerrorhandling (by raghav deshwal)
contract ErrorHandlingContract 
{
    function _require_Ex(uint256 x) public pure returns (uint256) 
    {
        require(x > 0, "x should be greater than zero");
        return x;
    }
    
    function _assert_Ex(uint256 x) public pure returns (uint256) 
    {
        assert(x > 0);
        return x;
    }
    
    function _revert_Ex(uint256 x) public pure returns (uint256) 
    {
        if (x == 0) 
        {
            revert("x should not be equal to zero");
        }
        return x;
    }
}
