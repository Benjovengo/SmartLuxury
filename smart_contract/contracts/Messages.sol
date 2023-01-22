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
        bool newMessage;
    }
    mapping(uint256 => Message) public allMessages;
    mapping(address => uint256) public messengerId;

    /* Modifiers - only certain entity can call some methods */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this method");
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
            _body,
            true
        );
    }

    /** Get messages
     *   - in the client-side, read the numberOfUsers to read the total number of users
     *   - get the message for all the users and check if it is a new message
     */
    function getMessages(uint256 _numberOfUsers)
        public
        onlyOwner
        returns (Message memory)
    {
        allMessages[_numberOfUsers].newMessage = false;
        return allMessages[_numberOfUsers];
    }
}
