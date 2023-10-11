const hre = require("hardhat");

async function main() {

    const EscrowFactory = await hre.ethers.getContractFactory("EscrowFactory");
    const escrowfactory = await EscrowFactory.deploy();
  
    await escrowfactory.deployed();

    console.log(
      `EscrowFactory deployed to ${escrowfactory.address}`
    )
}

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  