const { ethers } = require("hardhat");

const filmname = "avatar";
const ipfs = "https://gateway.pinata.cloud/ipfs/QmNQEkEQto3NyDr9hMKJwWN4E3MevzxzBJRNxqVoRUuNjr";
const validDate = 3874342999; //uinx timestamp
const ticketPrice = "1000000000000000000";

async function main() {

    const [owner] = await ethers.getSigners();

    const helper = await ethers.getContractAt("Helper", "0xC26408C60dc3167D8731198cb92f39E2B338B5Ab");

    await helper.connect(owner).createNewTicket(filmname, validDate, ipfs, ticketPrice);
    

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });