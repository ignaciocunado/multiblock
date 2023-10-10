// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import { Escrow } from './Escrow.sol';


contract EscrowFactory {

    mapping(address => address[]) contractsDeployedByUser;

    event EscrowDeployed(address indexed sender, address _arbiter, address _beneficiary );

    function deployContract(address arbiter, address beneficiary) external returns(address) payable{
        Escrow escrowContract = new Escrow(arbiter, beneficiary, msg.sender);
        (bool success, ) = payable(address(escrowContract)).call{value: msg.value}("");
        require(success);
        emit EscrowDeployed(msg.sender, arbiter, beneficiary);
        contractsDeployedByUser[msg.sender].push(address(escrowContract));
        return address(escrowContract);
    }

    function getUserContracts() public view returns(address[] memory){
        return contractsDeployedByUser[msg.sender];
    }

}