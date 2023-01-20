// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./tickets.sol";


contract Helper is Ownable {

    address payable public admin;
    uint256 private balance;
    mapping(string => Ticket) tickets;


    constructor() {
        admin = payable(msg.sender);
    }

    function createNewTicket(string memory _filmName, uint32 _startDate, string memory _uri) external onlyOwner {
        Ticket ticket = new Ticket(_filmName, _startDate, _uri);
        tickets[_filmName] = ticket;
    }

    function mint(string memory _filmName) payable public {
        require(msg.value >= 0.01 ether, "money is not enough");
        tickets[_filmName].safeMint(msg.sender);
    }

    function withdraw() public onlyOwner {
        admin.transfer(address(this).balance);
        balance = 0;
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function getTicket(string memory _filmName) public view returns(Ticket) {
        return tickets[_filmName];
    }
}