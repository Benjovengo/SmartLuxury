//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/* Verified contract for the contact information based on the blockchain address 
    -> Information given on by companies
    -> After a process of verification/validation
    -> only the deployer can add companies to that list
    -> used to check if the product's first owner belongs to the list
*/

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract VerifiedContacts {
    /* States */
    using Counters for Counters.Counter; // allow to create an enumerable ERC-721 token
    Counters.Counter private totalCustomers;

    address public owner;
    uint256 public userId;
    uint256 public numberOfCustomers;

    struct Customer {
        address ethAccount;
        string firstName;
        string lastName;
        string avatar;
        string email;
        string physicalAddress;
        uint256 poBox;
    }
    mapping(uint256 => Customer) public customers;
    mapping(address => uint256) public customerId;
    uint256[] tokenIds;
    mapping(address => uint256) public totalProductsOwned;
    mapping(address => uint256[]) public ownedProducts;
    mapping(address => mapping(uint256 => bool)) private isOwned;

    /* Modifiers - only certain address can call some methods */
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the owner can add accounts to this contract."
        );
        _;
    }

    /* Constructor Method 
        - sets the owner of the contacts contract
    */
    constructor() {
        owner = msg.sender;
    }

    /* Add Customer's Info 
        - get the data from the web and save it on the blockchain
        - test if account already exists before adding
    */
    function addAccount(
        string memory _firstName,
        string memory _lastName,
        string memory _avatar,
        string memory _email,
        string memory _physicalAddress,
        uint256 _poBox
    ) public onlyOwner {
        if (customerId[msg.sender] == 0) {
            userId++;
            customers[userId] = Customer(
                msg.sender,
                _firstName,
                _lastName,
                _avatar,
                _email,
                _physicalAddress,
                _poBox
            );
            customerId[msg.sender] = userId;
            totalCustomers.increment();
            numberOfCustomers = totalCustomers.current();
        }
    }

    /* Get Customer Info 
        - get the info based on the customer address
    */
    function getCustomerInfo(address _customerAddress)
        public
        view
        returns (Customer memory)
    {
        return customers[customerId[_customerAddress]];
    }

    /* Add Customer Items
        - test if the product ID has already been added
        - add the product ID of owned product based on the customer address
    */
    function addCustomerItems(address _customerAddress, uint256 _tokenId)
        public
    {
        if (!isOwned[_customerAddress][_tokenId]) {
            isOwned[_customerAddress][_tokenId] = true;
            totalProductsOwned[_customerAddress]++;
            ownedProducts[_customerAddress].push(_tokenId);
        }
    }

    /* Remove Customer Items
        - remove the product ID from the owned products list
    */
    function removeCustomerItems(address _customerAddress, uint256 _tokenId)
        public
    {
        isOwned[_customerAddress][_tokenId] = false;
        totalProductsOwned[_customerAddress]--;
        delete ownedProducts[_customerAddress][_tokenId];
    }

    /* Get Customer Info 
        - get the info based on the customer address
    */
    function getOwned(address _customerAddress)
        public
        view
        returns (uint256[] memory)
    {
        return ownedProducts[_customerAddress];
    }
}
