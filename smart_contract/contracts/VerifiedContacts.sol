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
*/



/* Verified contract for the contact information based on the blockchain address 
    -> Information given on by companies
    -> After a process of verification/validation
    -> only the deployer can add companies to that list
    -> used to check if the product's first owner belongs to the list
*/
contract VerifiedContacts {

}
