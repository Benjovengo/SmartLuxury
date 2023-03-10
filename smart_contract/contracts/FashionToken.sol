//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// OpenZeppelin - imports for NFT (ERC-721 token)
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/* Contract for the information and transactions of fashion products */
contract FashionToken is ERC721URIStorage {
    /* States */
    using Counters for Counters.Counter; // allow to create an enumerable ERC-721 token
    Counters.Counter private _tokenIds;
    address public owner;
    address private authorizeVerifier;
    address public deployer; // this address will receive the fees for the sales
    mapping(uint256 => uint256) public numberOfOwners; // total number of owners
    mapping(uint256 => mapping(uint256 => address)) private listOwners; // list of owners of a token
    mapping(string => bool) private registeredSerialNumber; // use serialNumber to check if it is registered
    mapping(string => uint256) private productID; // use the serial number to return the product ID
    mapping(uint256 => bool) private canFinalize; // check if the sale can be finalized

    /* Constructor Method */
    constructor() ERC721("Smart Luxury", "SLUX") {
        owner = msg.sender;
        deployer = msg.sender;
    }

    /* Change ownership of this token contract 
        - the SellingContract must be the owner of this token contract
    */
    function changeOwner(address _newOwner) public {
        require(msg.sender == owner, "Only the owner can call this function!");
        owner = _newOwner;
    }

    /** Authorize the verifier */
    function setVerifier(address _verifier) internal {
        require(msg.sender == owner, "Only the owner can call this function!");
        authorizeVerifier = _verifier;
    }

    /* Mint NFT
        - require the selling contract to call this function
        - require that the serial number of the product is not already registered
        - if it is registered, then return 0 as the id of the 'new' product
        - otherwise mint the product and increment the tokenID counter
     */
    function mint(
        string memory tokenURI,
        address _newOwner,
        string memory _serialNumber
    ) public returns (uint256) {
        // requirements to mint
        require(
            msg.sender == owner,
            "Only the Selling contract can mint products!"
        );
        // variables
        uint256 newItemId;
        bool alreadyRegistered = registeredSerialNumber[_serialNumber];

        // if the serial number hasn't been registered, mint the product NFT
        if (!alreadyRegistered) {
            // mint product NFT
            _tokenIds.increment();
            newItemId = _tokenIds.current();
            _mint(msg.sender, newItemId);
            _setTokenURI(newItemId, tokenURI);

            // mark serial number as registered
            registeredSerialNumber[_serialNumber] = true;
            // Update list of owners
            addToOwners(newItemId, _newOwner);
            // set the ID for that serial number
        }
        productID[_serialNumber] = uint256(newItemId);
        return newItemId;
    }

    /* Return the current ownership of the NFT */
    function getOwnershipOf(uint256 _nftId) public view returns (address) {
        return this.ownerOf(_nftId);
    }

    /* Return the total number of products/NFTs registered */
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    /* Update list of owners */
    function addToOwners(uint256 _nftID, address _newOwner) public {
        require(msg.sender == owner, "Invalid address call");
        numberOfOwners[_nftID]++;
        listOwners[_nftID][numberOfOwners[_nftID]] = _newOwner;
    }

    /* get owner - public function */
    function getOwner(uint256 _nftID, uint256 _ownerIndex)
        public
        view
        returns (address)
    {
        return listOwners[_nftID][_ownerIndex];
    }

    /* get first owner - public function */
    function getFirstOwner(uint256 _nftID) public view returns (address) {
        return listOwners[_nftID][1];
    }

    /* returns if a serial number has already been registered */
    function isRegistered(string memory _serialNum) public view returns (bool) {
        return registeredSerialNumber[_serialNum];
    }

    /* get product ID */
    function getProductID(string memory _serialNumber)
        public
        view
        returns (uint256)
    {
        return productID[_serialNumber];
    }

    /** Sale can be finalized from the delivery stand point */
    function setFinalizeDelivery(uint256 _nftID, bool _status) public {
        require(
            (msg.sender == owner || msg.sender == authorizeVerifier),
            "ERROR: setFinalizeDelivery - Unauthorized access!"
        );
        canFinalize[_nftID] = _status;
    }

    function getFinalizeStatus(uint256 _nftID) public view returns (bool) {
        return canFinalize[_nftID];
    }
}
