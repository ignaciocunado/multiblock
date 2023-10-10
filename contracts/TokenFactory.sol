// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {ERC20} from './ERC20.sol';

contract TokenFactory {

    mapping(address => address[]) public tokensDeployedByUser;

    event TokenCreated(
        address indexed _address,
        string _name,
        string _symbol,
        uint _initialSupply
    );

    function mintContract(string memory name, string memory ticker, uint decimals, uint initialSupply) external returns(address){
        ERC20 token = new ERC20(name, ticker, decimals, initialSupply);
        bool success = token.transfer(msg.sender, initialSupply);
        require(success);
        emit TokenCreated(address(token), name, ticker, initialSupply);
        tokensDeployedByUser[msg.sender].push(address(token));
        return address(newToken);
    }

    function getUserTokens() public view returns(address[] memory) {
        return tokensDeployedByUser[msg.sender];
    }
}