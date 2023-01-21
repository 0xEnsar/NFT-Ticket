const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();

    const helper = await ethers.getContractAt("Helper", "0x7C9EF60656b49B431863c2239B80d4E1a0B1BDcD");

    await helper.connect(owner).withdraw();
    

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });