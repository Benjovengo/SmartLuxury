//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// OpenZeppelin - imports for NFT (ERC-721 token)
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/* Contract for the information and transactions of fashion products */
contract FashionProducts is ERC721URIStorage {
    // allow to create an enumerable ERC-721 token
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Smart Luxury", "SLUX") {}

    function mint(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    // Return the ownership of the NFT
    function getOwnershipOf(uint256 _nftId) public view returns (address) {
        return this.ownerOf(_nftId);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
}
