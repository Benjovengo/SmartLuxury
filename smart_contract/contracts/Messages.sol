//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/* Leave a message section
    -> anyone can send a message to me there
    -> only I can read the messages (easily, at least)
*/

contract Messages {
    /* States */
    address public owner;
    uint256 public numberOfUsers;

    struct Message {
        address ethAccount;
        string name;
        string email;
        string subject;
        string body;
    }
    mapping(uint256 => Message) public allMessages;
    mapping(uint256 => bool) public isNew;
    mapping(address => uint256) public messengerId;

    /* Modifiers - only certain entity can call some methods */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function!");
        _;
    }

    /** Constructor Method */
    constructor() {
        owner = msg.sender; // sets the owner of the contacts contract
    }

    /** Add message */
    function addMessage(
        string memory _name,
        string memory _email,
        string memory _subject,
        string memory _body
    ) public {
        // test if new user
        if (messengerId[msg.sender] == 0) {
            numberOfUsers++;
            messengerId[msg.sender] = numberOfUsers;
        }
        // add message to the blockchain
        allMessages[messengerId[msg.sender]] = Message(
            msg.sender,
            _name,
            _email,
            _subject,
            _body
        );
        isNew[messengerId[msg.sender]] = true;
    }

    /** Mark as read */
    function notNew(uint256 _userID) public {
        isNew[_userID] = false;
    }
}
