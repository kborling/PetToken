var PetToken = artifacts.require("./PetToken.sol");

module.exports = function(deployer) {
  deployer.deploy(PetToken, 1000000);
};
