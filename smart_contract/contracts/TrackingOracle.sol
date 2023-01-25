// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "../node_modules/provable-eth-api/contracts/solc-v0.8.x/provableAPI.sol";

contract TrackingOracle is usingProvable {
    uint256 public dieselPrice;

    string public GET_PRICE_QUERY =
        //"xml(https://www.fueleconomy.gov/ws/rest/fuelprices).fuelPrices.diesel";
        "json(https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1&page=1&sparkline=false).0.current_price";

    constructor() payable {}

    function __callback(string memory _result) public {
        require(msg.sender == provable_cbAddress());
        dieselPrice = parseInt(_result, 2);
    }

    function retrieveBitcoinPrice() public payable {
        provable_query("URL", GET_PRICE_QUERY);
    }
}
