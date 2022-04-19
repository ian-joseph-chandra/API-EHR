const record = artifacts.require("../contracts/Records.sol");

module.exports = function(deployer) {
    // Demo is the contract's name
    deployer.deploy(record);
};
