// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ticket is ERC721, Ownable{
    using Strings for uint256;

    string public filmName;
    uint32 public startDate;
    uint256 private id;
    string public baseURI;
    uint256 public tokenId = 0;
    mapping(uint256 => bool) public isUsed;

    constructor(string memory _filmName, uint32 _startDate, string memory _baseURI) ERC721("Paribucineverse ticket", "PRBT") {
        filmName = _filmName;
        startDate = _startDate;
        baseURI = _baseURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns(string memory){
        super.tokenURI;

        ownerOf(tokenId);
        return string(abi.encodePacked(baseURI));
    }

    function safeMint(address to) public onlyOwner {
        _safeMint(to, tokenId);
        tokenId++;
    }

    function use(uint256 _id) external onlyOwner {
        isUsed[_id] = true;
    }

}