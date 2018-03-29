pragma solidity ^0.4.2;

contract PetToken {

    string public name = 'Pet Token';
    string public symbol = 'Pet';
    string public standard = 'Pet Token v1.0';
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    function PetToken (uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }
}
