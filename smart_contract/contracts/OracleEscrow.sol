//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

interface IERC721 {
    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
}

/* Contract to get shipment tracking status 
  Acts like a escrow contract */
contract OracleEscrow is IERC721Receiver {
    // state variables
    address public nftAddress;
    address payable public seller;
    address public oracle;

    /* Modifiers - only certain entity can call some methods */
    modifier onlyBuyer(uint256 _nftID) {
        require(msg.sender == buyer[_nftID], "Only buyer can call this method");
        _;
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Only seller can call this method");
        _;
    }

    modifier onlyOracleInspector() {
        require(
            msg.sender == oracle,
            "Only oracle inspector can call this method"
        ); // may need to change to nftAddress
        _;
    }

    // Mappings - per NFT properties
    mapping(uint256 => bool) public isListed; // Checks whether the product is listed or not
    mapping(uint256 => uint256) public purchasePrice;
    mapping(uint256 => uint256) public escrowAmount; // Amount transferred to the contract
    mapping(uint256 => address) public buyer;
    mapping(uint256 => bool) public wasDelivered; // Checks if the purchased item was delivered

    constructor(
        address _nftAddress,
        address payable _seller,
        address _oracle
    ) {
        nftAddress = _nftAddress;
        seller = _seller;
        oracle = _oracle;
    }

    // Receive confirmation for ERC-721 token - called upon a safe transfer
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    // List Product
    function list(
        uint256 _nftID,
        address _buyer,
        uint256 _purchasePrice,
        uint256 _escrowAmount
    ) public payable onlySeller {
        // Transfer the NFT from seller to this contract
        IERC721(nftAddress).safeTransferFrom(msg.sender, address(this), _nftID);

        isListed[_nftID] = true; // list product with ID=_nftID
        buyer[_nftID] = _buyer;
        purchasePrice[_nftID] = _purchasePrice;
        escrowAmount[_nftID] = _escrowAmount;
    }

    /* Put ether under contract (only buyer - payable oracleEscrow) */
    function depositEarnest(uint256 _nftID) public payable onlyBuyer(_nftID) {
        require(msg.value >= escrowAmount[_nftID]);
    }

    /* Inspects if the tracking status is 'delivered' (only oracle inspector) */
    function updateDeliveryStatus(uint256 _nftID, bool _delivered)
        public
        onlyOracleInspector
    {
        wasDelivered[_nftID] = _delivered;
    }

    // accept ether from other contracts
    receive() external payable {}

    /* Get the balance for the oracleEscrow contract */
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
