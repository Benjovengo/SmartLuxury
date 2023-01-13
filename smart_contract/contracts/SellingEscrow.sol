//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./FashionToken.sol";

/* Contract to get shipment tracking status 
  Acts like a escrow contract */
contract SellingEscrow is IERC721Receiver {
    // state variables
    address public nftAddress;
    address payable public seller;
    address public oracle;
    // Mappings - per NFT properties
    mapping(uint256 => bool) public isListed; // Checks whether the product is listed or not
    mapping(uint256 => uint256) public purchasePrice;
    //mapping(uint256 => uint256) public escrowAmount; // Amount transferred to the contract
    mapping(uint256 => address) public buyer;
    mapping(uint256 => address) public nftSeller;
    mapping(uint256 => bool) public wasDelivered; // Checks if the purchased item was delivered
    mapping(uint256 => mapping(address => bool)) public approval; // Approve the transaction

    FashionToken public fashionToken;

    /* Modifiers - only certain entity can call some methods */
    modifier onlySeller(uint256 _nftID) {
        require(
            msg.sender == fashionToken.getOwnershipOf(_nftID),
            "Only seller can call this method"
        );
        _;
    }

    modifier onlyOracleInspector() {
        require(
            msg.sender == oracle,
            "Only oracle inspector can call this method"
        ); // may need to change to nftAddress
        _;
    }

    constructor(address _nftAddress, address _oracle) {
        oracle = _oracle;
        nftAddress = _nftAddress;
        fashionToken = FashionToken(_nftAddress);
    }

    // Register new product
    function register(string memory _tokenURI) public {
        uint256 newID = fashionToken.mint(_tokenURI, msg.sender);
        IERC721(nftAddress).safeTransferFrom(address(this), msg.sender, newID);
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
    function list(uint256 _nftID, uint256 _purchasePrice)
        public
        payable
        onlySeller(_nftID)
    {
        // Transfer the NFT from seller to this contract
        IERC721(nftAddress).safeTransferFrom(msg.sender, address(this), _nftID);

        isListed[_nftID] = true; // list product with ID=_nftID
        nftSeller[_nftID] = msg.sender;
        purchasePrice[_nftID] = _purchasePrice;
    }

    /* Put ether under contract (buyer - payable oracleEscrow) */
    function depositEarnest(uint256 _nftID) public payable {
        require(msg.value >= purchasePrice[_nftID], "Insufficient funds!");
        buyer[_nftID] = msg.sender;
    }

    /* Inspects if the tracking status is 'delivered' (only oracle inspector) */
    function updateDeliveryStatus(uint256 _nftID, bool _delivered)
        public
        onlyOracleInspector
    {
        wasDelivered[_nftID] = _delivered;
    }

    /* Approve Sale */
    function approveSale(uint256 _nftID) public {
        approval[_nftID][msg.sender] = true;
    }

    /* Finalize Sale
       -> Require inspection status (add more items here, like appraisal)
       -> Require sale to be authorized
       -> Require funds to be correct amount
       -> Transfer NFT to buyer
       -> Transfer Funds to Seller */
    function finalizeSale(uint256 _nftID) public {
        require(wasDelivered[_nftID]); // require that the item was delivered to the buyer
        require(approval[_nftID][buyer[_nftID]]); // the transaction needs to be approved by all involved
        require(approval[_nftID][nftSeller[_nftID]]);
        require(approval[_nftID][oracle]);
        require(address(this).balance >= purchasePrice[_nftID]); // condition on the balance (amount transferred by the buyer)

        isListed[_nftID] = false; // stop listing the item

        // Transfer ether to the seller (from the OracleEscrow contract)
        (bool success, ) = payable(nftSeller[_nftID]).call{
            value: address(this).balance
        }("");
        require(success, "Unsuccessful transfer of funds to the seller.");

        // Transfer product ownership
        IERC721(nftAddress).safeTransferFrom(
            address(this),
            buyer[_nftID],
            _nftID
        );

        // add owner to list of owners
        fashionToken.addToOwners(_nftID, buyer[_nftID]);
    }

    /* Cancel Sale (handle earnest deposit)
       -> if inspection status is not approved, then refund, otherwise send to seller */
    function cancelSale(uint256 _nftID) public {
        if (wasDelivered[_nftID] == false) {
            payable(buyer[_nftID]).transfer(address(this).balance);
        } else {
            payable(seller).transfer(address(this).balance);
        }
    }

    // accept ether from other contracts
    receive() external payable {}

    /* Get the balance for the oracleEscrow contract */
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}