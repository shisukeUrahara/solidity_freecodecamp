//  SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
error Lottery_NotEnoughEthEntered();

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract Lottery {
    //   state variables
    uint256 private immutable i_entryFees;
    address payable[] private s_players;

    //  events
    event LotteryEnter(address indexed playerAddress);

    //  modifiers

    //  constructor
    constructor(uint256 entryFees) {
        i_entryFees = entryFees;
    }

    //  functions
    function enterLottery() public payable {
        if (msg.value < i_entryFees) {
            revert Lottery_NotEnoughEthEntered();
        }

        s_players.push(payable(msg.sender));
        //  emitting events
        emit LotteryEnter(msg.sender);
    }

    function requestRandomWinner() external {}

    function fullfillRandomWords() internal override {}

    //  view/pure functions
    function getEntryFees() public view returns (uint256) {
        return i_entryFees;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
