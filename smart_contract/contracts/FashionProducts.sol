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
    address public owner;
    mapping(uint256 => uint256) public numberOfOwners;
    mapping(uint256 => mapping(uint256 => address)) public listOwners;

    constructor() ERC721("Smart Luxury", "SLUX") {
        owner = msg.sender;
    }

    // change ownership
    function changeOwner(address _newOwner) public {
        require(msg.sender == owner);
        owner = _newOwner;
    }

    // mint NFT
    function mint(string memory tokenURI) public returns (uint256) {
        require(msg.sender == owner);
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // Update list of owners
        addToOwners(newItemId, msg.sender);

        return newItemId;
    }

    // Return the ownership of the NFT
    function getOwnershipOf(uint256 _nftId) public view returns (address) {
        return this.ownerOf(_nftId);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    // Update list of owners
    function addToOwners(uint256 _nftID, address _newOwner) public {
        require(msg.sender == owner, "Invalid address call");
        listOwners[_nftID][numberOfOwners[_nftID]] = _newOwner;
        numberOfOwners[_nftID]++;
    }

    /* get list of owners */
    function getOwners(uint256 _nftID) public view returns (address[] memory) {
        address[] memory owners = new address[](numberOfOwners[_nftID]);
        for (uint256 i = 0; i < numberOfOwners[_nftID]; i++) {
            owners[i] = listOwners[_nftID][i];
        }
        return owners;
    }
}
