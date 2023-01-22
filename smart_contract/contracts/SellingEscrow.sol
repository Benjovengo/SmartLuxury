//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./FashionToken.sol";
import "./Contacts.sol";

/* Contract to get shipment tracking status 
  Acts like a escrow contract */
contract SellingEscrow is IERC721Receiver {
    // state variables
    address public nftAddress;
    address payable public seller;
    address public oracle;
    address public contacts;
    uint256 private fee = 5;
    // Mappings - per NFT properties
    mapping(uint256 => bool) public isListed; // Checks whether the product is listed or not
    mapping(uint256 => uint256) public purchasePrice;
    mapping(uint256 => address) public buyer;
    mapping(uint256 => address) public nftSeller;
    mapping(uint256 => bool) public wasDelivered; // Checks if the purchased item was delivered
    mapping(uint256 => mapping(address => bool)) public approval; // Approve the transaction

    // Contracts
    FashionToken public fashionToken;
    Contacts public contactContract;

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

    /* Events */
    event productRegistered(address owner, uint256 regItem);
    event productListed(bool listed);
    event productUnlisted(bool unlisted);
    event saleFinalized(bool sale);

    /* Constructor Method */
    constructor(
        address _nftAddress,
        address _contacts,
        address _oracle
    ) {
        oracle = _oracle;
        contacts = _contacts;
        nftAddress = _nftAddress;
        fashionToken = FashionToken(_nftAddress);
        contactContract = Contacts(_contacts);
    }

    // Register new product
    function register(string memory _tokenURI, string memory _serialNumber)
        public
    {
        uint256 newID = fashionToken.mint(_tokenURI, msg.sender, _serialNumber);
        if (newID != 0) {
            IERC721(nftAddress).safeTransferFrom(
                address(this),
                msg.sender,
                newID
            );
            // add token to list of owned tokens
            contactContract.addCustomerItems(msg.sender, newID);
            // register confirmation
            emit productRegistered(msg.sender, newID);
        }
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

    // List product for sale
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
        emit productListed(true);
    }

    function approveTransfer(uint256 _nftID) public {
        fashionToken.approve(msg.sender, _nftID);
    }

    function unlist(uint256 _nftID) public {
        require(
            nftSeller[_nftID] == msg.sender,
            "Only the owner can call this method."
        );

        // Transfer the NFT back from this contract to seller
        IERC721(nftAddress).safeTransferFrom(address(this), msg.sender, _nftID);

        // update listing and ownership status
        isListed[_nftID] = false; // list product with ID=_nftID
        nftSeller[_nftID] = msg.sender;

        // broadcast product unlisted
        emit productUnlisted(true);
    }

    /* Put ether under contract (buyer - payable oracleEscrow) */
    function depositEarnest(uint256 _nftID) public payable {
        require(msg.value >= purchasePrice[_nftID], "Insufficient funds!");
        buyer[_nftID] = msg.sender;
    }

    /* Oracle
        - Inspects if the tracking status is 'delivered' (only oracle inspector) */
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
        //require(wasDelivered[_nftID]); // require that the item was delivered to the buyer
        //require(approval[_nftID][buyer[_nftID]]); // the transaction needs to be approved by the buyer
        //require(approval[_nftID][nftSeller[_nftID]]); // the transaction needs to be approved by the seller
        //require(approval[_nftID][oracle]); // transaction approved by the delivery service
        require(address(this).balance >= purchasePrice[_nftID]); // condition on the balance (amount transferred by the buyer)

        // Transfer ether to the seller (from the SellingEscrow contract)
        uint256 afterFee = uint256(purchasePrice[_nftID]) *
            uint256(95) *
            (10**14);
        (bool success, ) = payable(nftSeller[_nftID]).call{value: afterFee}("");
        require(success, "Unsuccessful transfer of funds to the seller.");

        address deployer = fashionToken.deployer();
        uint256 myFee = uint256(purchasePrice[_nftID]) * uint256(5) * (10**14);
        (bool anotherSuccess, ) = payable(deployer).call{value: myFee}("");

        // Transfer product ownership
        IERC721(nftAddress).safeTransferFrom(
            address(this),
            buyer[_nftID],
            _nftID
        );
        // set as unlisted
        isListed[_nftID] = false; // stop listing the item
        // add owner to list of owners
        fashionToken.addToOwners(_nftID, buyer[_nftID]);
        // add token to buyer's account
        contactContract.addCustomerItems(buyer[_nftID], _nftID);
        // confirm sale
        emit saleFinalized(success && anotherSuccess);
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
