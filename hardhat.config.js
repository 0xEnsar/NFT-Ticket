require("@nomiclabs/hardhat-waffle");

const PRIVATE_KEY = "";


module.exports = {
    solidity: "0.8.14",
    networks: {
      fuji: {
        url: `https://api.avax-test.network/ext/bc/C/rpc`,
          accounts: [`${PRIVATE_KEY}`]
      }
    }
};