//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/** Information about the shipment 
    -> Information given on by companies
    -> After a process of verification/validation
    -> only the contacts on the Verified Contacts can call this methods
*/

import "./SellingEscrow.sol";
import "./VerifiedContacts.sol";

contract ShippingInfo {
    /** Contracts */
    // Selling Contract
    SellingEscrow private sellingEscrow;
    // Verified Contacts
    VerifiedContacts private verifiedContacts;

    // States
    address private owner; // owner of the contract
    mapping(address => mapping(uint256 => bool)) private delivered; // set status as delivered for the sale of product NFT_ID (uint256) to BUYER (address)
    mapping(address => mapping(uint256 => bool)) private inPerson; /* the sale of the product 
                                                                    NFT_ID (uint256) to BUYER (address) was presential?
                                                                    - Buyer has to approve.*/
    mapping(address => mapping(uint256 => address)) private buyer; // buyer's address
    //address private seller; // seller address - sellingEscrow.getSeller(_nftID)

    // Events
    event productDelivered(
        address _buyerAddress,
        uint256 _nftID,
        bool _deliveredStatus
    );
    event inPersonSaleEvent(
        address _buyerAddress,
        uint256 _nftID,
        bool _isPresentialSale
    );

    /* Modifiers - only certain entity can call some methods */
    modifier onlyVerified(address _caller) {
        require(
            (msg.sender == owner ||
                verifiedContacts.isVerifiedContact(_caller)),
            "Only the owner or a verified contact can call this method"
        );
        _;
    }

    modifier onlyBuyer(uint256 _nftID) {
        require(
            (msg.sender == buyer[sellingEscrow.getSeller(_nftID)][_nftID] &&
                sellingEscrow.isListed(_nftID)),
            "Only the owner or a verified contact can call this method"
        );
        _;
    }

    /** Constructor Method 
      - sets the owner of the shipment info contract
    */
    constructor() {
        owner = msg.sender;
    }

    /** Update delivered status
      - only owner OR the verified carrier OR the selling contract can call this method
      - at any buying operation, check if there is an entry at delivered
        or in person with the SELLER'S ADDRESS AND THAT PARTICULAR NFT NUMBER 
        and set both mappings to false
        (it is important to prevent the approval of a subsequent sale to a
        previous buyer before the delivery of the product)
    */
    function updateDeliveryStatus(
        address _buyer,
        uint256 _nftID,
        bool _newStatus
    ) public onlyVerified(msg.sender) {
        delivered[_buyer][_nftID] = _newStatus;
        if (_newStatus) {
            emit productDelivered(_buyer, _nftID, _newStatus);
        }
    }

    /** Return delivered state */
    function isDelivered(address _buyer, uint256 _nftID)
        public
        view
        returns (bool)
    {
        return delivered[_buyer][_nftID];
    }

    /** Update in person sale status
      - only owner OR the verified carrier OR the selling contract can call this method
      - at any buying operation, check if there is an entry at delivered
        or in person with the SELLER'S ADDRESS AND THAT PARTICULAR NFT NUMBER 
        and set both mappings to false
        (it is important to prevent the approval of a subsequent sale to a
        previous buyer before the delivery of the product)
    */
    function updateInPersonStatus(
        address _buyer,
        uint256 _nftID,
        bool _newStatus
    ) public onlyVerified(msg.sender) {
        inPerson[_buyer][_nftID] = _newStatus;
        if (_newStatus) {
            emit inPersonSaleEvent(_buyer, _nftID, _newStatus);
        }
    }

    /** Return whether or not the sele was presential */
    function isPresential(address _buyer, uint256 _nftID)
        public
        view
        returns (bool)
    {
        return inPerson[_buyer][_nftID];
    }
}
