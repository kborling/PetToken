var PetToken = artifacts.require("./PetToken.sol");

contract('PetToken', function(accounts) {
    it('Sets the total supply on deployment', function() {
        return PetToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'Sets the total supply to 1,000,000');
        });
    });
})