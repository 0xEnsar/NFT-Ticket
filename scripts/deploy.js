const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    const Helper = await ethers.getContractFactory("Helper");
    const help = await Helper.deploy();

    console.log("Cont address: ", help.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });