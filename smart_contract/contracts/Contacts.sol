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
    string first_name;
    string last_name;
    string email;
    string physical_address;
    uint256 po_box;

    constructor() {
        owner = msg.sender;
    }

    function addAccount(
        string memory _first_name,
        string memory _last_name,
        string memory _email,
        string memory _physical_address,
        uint256 _po_box
    ) public {
        first_name = _first_name;
        last_name = _last_name;
        email = _email;
        physical_address = _physical_address;
        po_box = _po_box;
    }
}
