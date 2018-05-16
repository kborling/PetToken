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
    it('Transfers token ownership', function() {
        return PetToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 99999999999999999999999);
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'Error: Message must contain revert');
            return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
        }).then(function(success) {
            assert.equal(success, true, 'Returns true');
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'Triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'The Transfer event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'Logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'Logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 250000, 'Logs the transfer amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 250000, 'Adds the amount to the receiving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 750000, 'Deducts the amount from the sending account');
        })
    });
})
