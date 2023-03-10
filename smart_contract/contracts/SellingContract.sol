//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./FashionToken.sol";
import "./Contacts.sol";

/* Contract to get shipment tracking status 
  Acts like a escrow contract */
contract SellingContract is IERC721Receiver {
    // state variables
    address public nftAddress;
    address payable public seller;
    address public verifier;
    address public contacts;
    uint256 private fee = 5;
    // Mappings - per NFT properties
    mapping(uint256 => bool) public isListed; // Checks whether the product is listed or not
    mapping(uint256 => uint256) public purchasePrice;
    mapping(address => mapping(uint256 => uint256)) public deposit; // [buyer][nftId] -> [value]
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
            "Only the owner can call this function!"
        );
        _;
    }

    modifier onlyVerifier() {
        require(
            msg.sender == verifier,
            "Only the verifier can call this function!"
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
        address _verifier
    ) {
        verifier = _verifier;
        contacts = _contacts;
        nftAddress = _nftAddress;
        fashionToken = FashionToken(_nftAddress);
        contactContract = Contacts(_contacts);
    }

    /* Register new product
        - check if the serial number has already been registered before
    */
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
            "Only the owner can call this function!"
        );

        // Transfer the NFT back from this contract to seller
        IERC721(nftAddress).safeTransferFrom(address(this), msg.sender, _nftID);

        // update listing and ownership status
        isListed[_nftID] = false; // list product with ID=_nftID

        // broadcast product unlisted
        emit productUnlisted(true);
    }

    /* Put ether under contract (buyer - payable verifierEscrow) */
    function depositEarnest(uint256 _nftID) public payable {
        require(msg.value >= purchasePrice[_nftID], "Insufficient funds!");
        buyer[_nftID] = msg.sender;
        deposit[msg.sender][_nftID] = msg.value;
    }

    /* Verifier
        - Inspects if the tracking status is 'delivered' (only verifier inspector) */
    function updateDeliveryStatus(uint256 _nftID, bool _delivered)
        public
        onlyVerifier
    {
        wasDelivered[_nftID] = _delivered;
    }

    /* Approve Sale */
    function approveSale(uint256 _nftID) public {
        approval[_nftID][msg.sender] = true;
    }

    /* Finalize Sale
       -> Require delivered status
       -> Require funds to be correct amount
       -> Transfer NFT to buyer
       -> Transfer Funds to Seller */
    function finalizeSale(uint256 _nftID) public {
        require(
            fashionToken.getFinalizeStatus(_nftID),
            "The sale must be approved before it can be finalized!"
        ); // require that the sell can be finalized
        require(
            deposit[buyer[_nftID]][_nftID] >= purchasePrice[_nftID],
            "Insufficient funds!"
        );

        // Transfer ether to the seller (from the SellingContract contract)
        address sellerAddr = nftSeller[_nftID];
        uint256 afterFee = uint256(purchasePrice[_nftID]) *
            uint256(95) *
            (10**14);
        (bool success, ) = payable(sellerAddr).call{value: afterFee}("");

        // Transfer fees
        address deployer = fashionToken.deployer();
        uint256 myFee = uint256(purchasePrice[_nftID]) * uint256(5) * (10**14);
        (bool anotherSuccess, ) = payable(deployer).call{value: myFee}("");

        fashionToken.approve(buyer[_nftID], _nftID);

        // Transfer product ownership
        IERC721(nftAddress).safeTransferFrom(
            address(this),
            buyer[_nftID],
            _nftID
        );
        // clear deposits
        deposit[buyer[_nftID]][_nftID] = uint256(0);
        // set as unlisted
        isListed[_nftID] = false; // stop listing the item
        // add owner to list of owners
        fashionToken.addToOwners(_nftID, buyer[_nftID]);
        // reset finalize delivery status
        fashionToken.setFinalizeDelivery(_nftID, false);
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

    /* Get the balance for this contract */
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /* Return the seller of the product */
    function getSeller(uint256 _nftID) public view returns (address) {
        return nftSeller[_nftID];
    }
}
