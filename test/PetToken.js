var PetToken = artifacts.require("./PetToken.sol");

contract('PetToken', function(accounts) {
    var tokenInstance;

    it('Initializes the contract with correct values', function() {
        return PetToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name, 'Pet Token', 'The name is correct');
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol, 'Pet', 'The symbol is correct');
            return tokenInstance.standard();
        }).then(function(standard){
            assert.equal(standard, 'Pet Token v1.0', 'The standard is correct');
        });
    });
    it('Allocates the initial supply on deployment', function() {
        return PetToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'Sets the total supply to 1,000,000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 1000000, 'Allocates the initial supply to the admin account')
        });
    });
})
