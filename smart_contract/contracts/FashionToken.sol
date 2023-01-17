//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// OpenZeppelin - imports for NFT (ERC-721 token)
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract FashionToken is ERC721 {
    address public owner;

    /* Constructor Method */
    constructor() ERC721("Smart Luxury", "SLUX") {
        owner = msg.sender;
    }

    function changeOwner(address _newOwner) public {
        owner = _newOwner;
    }
}
