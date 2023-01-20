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
        await helper.connect(owner).createNewTicket("avatar", 5, "avatar");
        ticketA = await helper.connect(owner).getTicket("avatar");
        expect(ticketA).to.be.properAddress;
    })

    it("ticket return base uri", async function() {
        ticketA = await ethers.getContractAt("Ticket", ticketA);
        expect(await ticketA.connect(owner).getBaseURI()).to.equal("avatar");
    })


    it("mint a ticket", async function() {
        await helper.connect(owner).mint("avatar", { value: ethers.utils.parseEther("0.01") });
        expect(await ticketA.connect(owner).balanceOf(owner.address)).to.equal(1);
    })

    it("mint a ticket with wrong value", async function() {
        await expect(helper.connect(owner).mint("avatar", { value: ethers.utils.parseEther("0.001") })).to.be.revertedWith("money is not enough");
    })

    it("withdraw", async function() {
        await helper.connect(owner).withdraw();
        expect(await provider.getBalance(helper.address)).to.equal(0);
    })
})
