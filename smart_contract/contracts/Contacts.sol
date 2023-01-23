//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/* Regular Contact
    -> anyone can register a new contact using an address
    -> the states: mapping using the address as a key
        - first name
        - last name
        - link to avatar picture
        - email
        - physical address -> street, city, state, country, PO Box
*/

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract Contacts {
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
    ) public {
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
        bool added;
        for (uint256 i; i < totalProductsOwned[_customerAddress]; i++) {
            if (ownedProducts[_customerAddress][i] == _tokenId) {
                added = true;
            }
        }
        if (!added) {
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
