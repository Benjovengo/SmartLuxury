//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/* Information about the shipment 
    -> Information given on by companies
    -> After a process of verification/validation
    -> only the contacts on the Verified Contacts can call this methods
*/

contract ShippingInfo {
    // States
    address private owner; // owner of the contract
    mapping(address => mapping(uint256 => bool)) private delivered; // set status as delivered for the sale of product NFT_ID (uint256) to BUYER (address)
    mapping(address => mapping(uint256 => bool)) private presential; /* the sale of the product 
                                                                      NFT_ID (uint256) to BUYER (address) was presential?
                                                                      - Buyer has to approve.*/

    // Events
    event productDelivered(address _buyerAddress, uint256 _nftID);
    event presentialSale(bool _isPresentialSale);

    /** Constructor Method 
      - sets the owner of the shipment info contract
  */
    constructor() {
        owner = msg.sender;
    }

    /** Update delivered status
      - only owner OR the selling contract can call this method
      - at any buying operation, check if there is an entry at delivered
        or presential with the SELLER'S ADDRESS AND THAT PARTICULAR NFT NUMBER 
        and set both mappings to false
        (it is important to prevent the approval of a subsequent sale to a
        previous buyer before the delivery of the product)
     */

    /** Return whether or not the sele was presential */
    function isPresential(address _buyer, uint256 _nftID)
        public
        view
        returns (bool)
    {
        bool isPresentialSale = presential[_buyer][_nftID];
        return isPresentialSale;
    }

    /** Return delivered state */
    function isDelivered(address _buyer, uint256 _nftID)
        public
        view
        returns (bool)
    {
        bool wasDelivered = delivered[_buyer][_nftID];
        return wasDelivered;
    }
}