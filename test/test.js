const { ethers } = require("hardhat");
const { expect } = require("chai");
const provider = ethers.provider;

describe("Helper Contract", function() { 
    let owner, signer1, signer2, signer3, user1, user2;
    let Helper, helper;
    let ticketA, ticketB;

    before(async function() {
        [owner, signer1, signer2, signer3, user1, user2] = await ethers.getSigners();
    })

    it("helper contract deploy", async function() {
        Helper = await ethers.getContractFactory("Helper");
        helper = await Helper.connect(owner).deploy();
        expect(helper.address).to.be.properAddress;
    })

    it("helper create a new ticket type", async function() {
        await helper.connect(owner).createNewTicket("avatar", 1874342999, "avatar",  1);
        ticketA = await helper.connect(owner).getTicket("avatar");
        expect(ticketA).to.be.properAddress;
    })

    it("mint a ticket", async function() {
        ticketA = await ethers.getContractAt("Ticket", ticketA);
        await helper.connect(owner).mint("avatar", { value: ethers.utils.parseEther("1") });
        expect(await ticketA.connect(owner).balanceOf(owner.address)).to.equal(1);
    })

    it("ticket return base uri", async function() {
        expect(await ticketA.connect(owner).tokenURI(0)).to.equal("avatar");
    })

    it("mint a ticket with wrong value", async function() {
        await expect(helper.connect(owner).mint("avatar", { value: ethers.utils.parseEther("0.01") })).to.be.reverted;
    })

    it("withdraw", async function() {
        await helper.connect(owner).withdraw();
        expect(await provider.getBalance(helper.address)).to.equal(0);
    })
})
