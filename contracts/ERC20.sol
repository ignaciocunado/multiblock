// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract Token is ERC20, ERC20Detailed {
    
    constructor(string memory name, string memory ticker, uint256 decimals, uint256 initialSupply) ERC20Detailed(Name, ticker, decimals) public {
        _mint(msg.sender, initialSupply);
    }
}