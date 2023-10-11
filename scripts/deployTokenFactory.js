const hre = require("hardhat");

async function main() {

    const TokenFactory = await hre.ethers.getContractFactory("TokenFactory");
    const tokenFactory = await TokenFactory.deploy();
  
    await tokenFactory.deployed();
  
    console.log(
        `TokenFactory deployed to ${tokenFactory.address}`
      );
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  