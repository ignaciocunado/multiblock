// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { Escrow } from './Escrow.sol';


contract EscrowFactory {

    mapping(address => address[]) contractsDeployedByUser;

    event EscrowDeployed(address indexed sender, address _arbiter, address _beneficiary );

    function deployContract(address arbiter, address beneficiary) external payable returns(address){
        Escrow escrowContract = new Escrow{value: msg.value}(arbiter, beneficiary, msg.sender);
        emit EscrowDeployed(msg.sender, arbiter, beneficiary);
        contractsDeployedByUser[msg.sender].push(address(escrowContract));
        return address(escrowContract);
    }

    function getUserContracts() public view returns(address[] memory){
        return contractsDeployedByUser[msg.sender];
    }

}