//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

interface IERC721 {
    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
}

/* Contract to get shipment tracking status 
    Acts like a escrow contract */
contract OracleShipment {
    // state variables
    address public nftAddress;
    address payable public seller;

    constructor(address _nftAddress, address payable _seller) {
        nftAddress = _nftAddress;
        seller = _seller;
    }

    // List Product
    function list(uint256 _nftID) public {
        IERC721(nftAddress).safeTransferFrom(msg.sender, address(this), _nftID);
    }
}
