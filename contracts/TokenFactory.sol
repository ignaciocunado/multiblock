// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Token} from './Token.sol';

contract TokenFactory {

    mapping(address => address[]) public tokensDeployedByUser;

    event TokenCreated(
        address indexed _address,
        string _name,
        string _symbol,
        uint _initialSupply
    );

    function mintContract(string memory name, string memory ticker, uint initialSupply) external returns(address){
        Token token = new Token(name, ticker, initialSupply);
        bool success = token.transfer(msg.sender, initialSupply);
        require(success);
        emit TokenCreated(address(token), name, ticker, initialSupply);
        tokensDeployedByUser[msg.sender].push(address(token));
        return address(token);
    }

    function getUserTokens() public view returns(address[] memory) {
        return tokensDeployedByUser[msg.sender];
    }

}