// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./tickets.sol";


contract Helper is Ownable {

    address payable public admin;
    uint256 private balance;
    mapping(string => Ticket) tickets;

    event Mint(string filmname);

    constructor() {
        admin = payable(msg.sender);
    }

    function createNewTicket(string memory _filmName, uint32 _validDate, string memory _uri, uint _ticketPrice) external onlyOwner {
        require(_validDate > block.timestamp, "Date is wrong");
        Ticket ticket = new Ticket(_filmName, _validDate, _uri, _ticketPrice);
        tickets[_filmName] = ticket;
    }

    function mint(string memory _filmName) payable public {
        Ticket ticket = tickets[_filmName];
        require(msg.value >= ticket.getTicketPrice() * 1000000000000000000, "Ether is not enought");
        ticket.safeMint(msg.sender);
        emit Mint(_filmName);
    }

    function useTicket(string memory _filmName, uint _id) public {
        tickets[_filmName].use(_id);
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