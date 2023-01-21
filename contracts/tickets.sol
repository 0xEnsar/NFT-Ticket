// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ticket is ERC721, Ownable{
    using Strings for uint256;

    string public filmName;
    uint32 public validDate;
    uint public ticketPrice;
    string public baseURI;
    uint256 public tokenId = 0;
    mapping(uint256 => bool) public isUsed;

    constructor(string memory _filmName, uint32 _validDate, string memory _baseURI, uint _ticketPrice) ERC721("Paribucineverse ticket", "PRBT") {
        filmName = _filmName;
        validDate = _validDate;
        baseURI = _baseURI;
        ticketPrice = _ticketPrice;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns(string memory){
        super.tokenURI;

        ownerOf(tokenId);
        return string(abi.encodePacked(baseURI));
    }

    function safeMint(address to) public onlyOwner isValid{
        _safeMint(to, tokenId);
        tokenId++;
    }

    function use(uint256 _id) external onlyOwner isValid {
        isUsed[_id] = true;
    }

    function getTicketPrice() public view returns(uint) {
        return ticketPrice;
    }

    modifier isValid {
        require(validDate > block.timestamp, "Ticket is not valid");
        _;
    }

}