// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {

	address public arbiter;
	address public beneficiary;
	address public depositor;

	bool public isApproved;

	constructor(address _arbiter, address _beneficiary, address _depositor) payable {
		arbiter = _arbiter;
		beneficiary = _beneficiary;
		depositor = _depositor;
	}

	event Approved(uint);

	function approve() external {
		require(msg.sender == arbiter);
		uint balance = address(this).balance;
		(bool sent, ) = payable(beneficiary).call{value: balance}("");
 		require(sent, "Failed to send Ether");
		emit Approved(balance);
		isApproved = true;
	}
}
