const { ethers } = require("hardhat");

const filmname = "avatar";

async function main() {

    const [owner] = await ethers.getSigners();

    const helper = await ethers.getContractAt("Helper", "0x393E05d78e2aacEB9A7e8804aE44027c84b3c75E");

    await helper.connect(owner).createNewTicket(filmname, 5, "https://gateway.pinata.cloud/ipfs/QmNQEkEQto3NyDr9hMKJwWN4E3MevzxzBJRNxqVoRUuNjr");
    

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });