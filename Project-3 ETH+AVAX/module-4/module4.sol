// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IERC20 
{
    function _balance_Of_(address account) external view returns (uint256);
    function _transfer_(address recipient, uint256 amount) external returns (bool);
}

contract DegenToken
{
    string public _name;
    string public _symbol;
    uint256 private _total_Supply_;
    mapping(address => uint256) private _balances_;
    address private _owner_;
    event Token_Purchased_(address indexed buyer, uint256 itemId);
    
    uint public _item_Count_ = 0;

    struct _itemInfo_ 
    {
        uint _itemId_;
        string _name_;
        uint256 _price_;
    }
    
    mapping(uint256 => _itemInfo_) private _items_;

    constructor() 
    {
        _name = "Degen";
        _symbol = "DGN";
        _total_Supply_ = 1000000;
        _owner_ = msg.sender;
    }

    modifier only_Owner_() 
    {
        require(msg.sender == _owner_, "Only owner can access.");
        _;
    }

    function balance_Of_(address account) external view returns (uint256) 
    {
        return _balances_[account];
    }

    function transfer(address recipient, uint256 amount_) external returns (bool) 
    {
        require(amount_ > 0, "Amount should not be less than zero.");
        require(_balances_[msg.sender] >= amount_, "Insufficient Balance.");
        _balances_[msg.sender] -= amount_;
        _balances_[recipient] += amount_;
        return true;
    }

    function add_Item_(string memory itemName, uint256 price) public only_Owner_ 
    {
        _item_Count_++;
        _items_[_item_Count_] = _itemInfo_(_item_Count_, itemName, price);
    }

    function buy_Item_(uint256 itemId) external payable 
    {
        require(itemId <= _item_Count_, "No such item found.");
        require(_balances_[msg.sender] >= _items_[itemId]._price_, "Insufficient balance.");
        _balances_[msg.sender] -= _items_[itemId]._price_;
        emit Token_Purchased_(msg.sender, itemId);
    }

    function get_ItemDetails_(uint256 itemId) external view returns (string memory, uint256) 
    {
        require(itemId <= _item_Count_, "No such item found.");
        return (_items_[itemId]._name_, _items_[itemId]._price_);
    }

    function Item_List_() external view returns (_itemInfo_[] memory) 
    {
        _itemInfo_[] memory allItems_ = new _itemInfo_[](_item_Count_);
        for (uint i = 1; i <= _item_Count_; i++) 
        {
            allItems_[i - 1] = _items_[i];
        }
        return allItems_;
    }

    function owner_() external view returns (address) 
    {
        return _owner_;
    }

    // For testing purposes only. This function should not be used in production.
    function mint(address to, uint256 amount_) external only_Owner_ 
    {
        require(amount_ > 0, "Amount should not be less than zero.");
        _total_Supply_ += amount_;
        _balances_[to] += amount_;
    }
}
