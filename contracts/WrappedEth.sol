//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WrappedEth is ERC20, ERC20Burnable, Pausable, Ownable {
    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {}

    /**
     * @dev Buy tokens with eth equivalent 
     */
    function buy() public payable whenNotPaused returns (bool) {
        require(msg.value > 0, "WrappedEth: value is zero");

        _mint(msg.sender, msg.value);

        return true;
    }

    /**
     * @dev Sell tokens for eth equivalent 
     */
    function sell(uint256 _amount) public whenNotPaused returns (bool) {
        require(_amount > 0, "WrappedEth: amount is zero");
        require(
            _amount <= balanceOf(msg.sender),
            "WrappedEth: insufficient token balance"
        );

        _burn(msg.sender, _amount);
        require(
            payable(msg.sender).send(_amount),
            "WrappedEth: insufficient eth balance"
        );

        return true;
    }

    /**
     * @dev Allows owner to pause the contract
     */
    function pause() public onlyOwner returns (bool) {
        _pause();
        return true;
    }

    /**
     * @dev Allows owner to unpause the contract
     */
    function unpause() public onlyOwner returns (bool) {
        _unpause();
        return true;
    }

    /**
     * @dev ERC20 transfer with whenNotPaused modifier
     */
    function transfer(address to, uint256 amount)
        public
        virtual
        override
        whenNotPaused
        returns (bool)
    {
        return super.transfer(to, amount);
    }

    /**
     * @dev ERC20 transferFrom with whenNotPaused modifier
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override whenNotPaused returns (bool) {
        return super.transferFrom(from, to, amount);
    }
}
