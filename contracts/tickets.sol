// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ticket is ERC721, Ownable{

    string public filmName;
    uint32 public startDate;
    uint256 private id;
    string private baseURI;
    uint256 public tokenId = 0;
    mapping(uint256 => bool) public isUsed;
    // mapping(address => uint256[]) ownerIds;

    constructor(string memory _filmName, uint32 _startDate, string memory __baseURI) ERC721("Paribucineverse ticket", "PRBT") {
        filmName = _filmName;
        startDate = _startDate;
        baseURI = __baseURI;
    }


    function getBaseURI() external view returns (string memory) {
        return baseURI;
    }

    function safeMint(address to) public onlyOwner {
        _safeMint(to, tokenId);
        tokenId++;
    }

    function use(uint256 _id) external {
        isUsed[_id] = true;
    }

}