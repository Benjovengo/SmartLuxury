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

    constructor(address _nftAddress, address payable _seller) {
        nftAddress = _nftAddress;
        seller = _seller;
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
    function list(uint256 _nftID) public {
        // Transfer the NFT from seller to this contract
        IERC721(nftAddress).safeTransferFrom(msg.sender, address(this), _nftID);
    }
}
