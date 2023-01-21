const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();

    const helper = await ethers.getContractAt("Helper", "0x25b294Cc51F1771DD9035DD223932d0Fa199ff49");

    await helper.connect(owner).withdraw();
    

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });