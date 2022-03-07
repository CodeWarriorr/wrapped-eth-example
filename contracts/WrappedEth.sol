//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
Pierwsze zadanie będzie nastepujące. 

Napisz kontrakt tokena ERC20 (możesz do tego celu wykorzystać zasoby Openzeppelin)
a) kontrakt powinien pozwolić zdefiniować symbol tokena, nazwę tokena tokena w konstruktorze. 
b) kontrakt powinien posiadać funkcję do kupowania tokena. Kontrakt mintuje tokeny w zamian za zdeponowane ETH w ilości 1:1
c) adekwatnie powinien posiadać funkcję, która pozwala wypłacić userowi ETH w zamian za zburnowanie adekwatnej ilości naszego tokena 
d) kontrakt powinien posiadać funkcje administracyjne dostępne dla adresu walleta, który zdeployował kontrakt:

pause/unpause możliwości zakupu/sprzedaży tokena z podpunktów b, c;
pause/unpause możliwości transferu tokenów
 */

contract WrappedEth is ERC20, ERC20Burnable, Pausable, Ownable {
    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {}

    /**
      require value > 0
      mint exact amount 
    */
    function buy() public payable whenNotPaused returns (bool) {
      return true;
    }

    /**
      require amount > 0
      require amount > balance
      burn
      send eth
    */
    function sell(uint256 _amount) public whenNotPaused returns (bool) {
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
}
