//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/* Regular Contact
    -> anyone can register a new contact using an address
    -> the states: mapping using the address as a key
        - first name
        - last name
        - email
        - physical address -> street, city, state, country, PO Box
        - products -> IDs of the products owned by that contract (remove after a sale is complete)
            |-> get from FashionToken - create mapping from address to list (mapping) of token IDs owned by that address
*/

import "./FashionToken.sol";

contract Contacts {
    /* States */
    address owner;
    uint256 userId;

    struct Customer {
        address ethAccount;
        string firstName;
        string lastName;
        string email;
        string physicalAddress;
        uint256 poBox;
    }
    mapping(uint256 => Customer) public customers;
    mapping(address => uint256) public customerId;

    /* Constructor Method 
        - sets the owner of the contacts contract
    */
    constructor() {
        owner = msg.sender;
    }

    /* Add Customer's Info 
        - get the data from the web and save it on the blockchain
    */
    function addAccount(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _physicalAddress,
        uint256 _poBox
    ) public {
        userId++;
        customers[userId] = Customer(
            msg.sender,
            _firstName,
            _lastName,
            _email,
            _physicalAddress,
            _poBox
        );
        customerId[msg.sender] = userId;
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
}
