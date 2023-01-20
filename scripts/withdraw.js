const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();

    const helper = await ethers.getContractAt("Helper", "0xa0393430dbFFbAAC019dA1c634b3B4cf5a4ADd30");

    await helper.connect(owner).withdraw();
    

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });