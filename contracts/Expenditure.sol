// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Expenditure {
    // state variables.

    uint256 expenditure;

    address owner;

    struct LendingDetails {
        address _recepient;
        uint amount;
    }

    mapping(address => LendingDetails[]) public lendingMoney;

    constructor() {
        owner = address(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owenr");
        _;
    }

    function getBalance() public view returns (uint) {
        return address(owner).balance;
    }

    function addExpenditure(uint _spend) public {
        expenditure = expenditure + _spend;
    }

    function getExpenditure() public view returns (uint) {
        return expenditure;
    }

    function lending(address _address, uint _amount) public {
        lendingMoney[msg.sender].push(LendingDetails(_address, _amount));
    }

    function getLendMoney() public view returns (LendingDetails[] memory) {
        return lendingMoney[msg.sender];
    }

    function getOwner() public view returns (address) {
        return address(owner);
    }
}
