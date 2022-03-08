### Wrapped Eth Simple Example

**For educational purpose only.**

Napisz kontrakt tokena ERC20 (możesz do tego celu wykorzystać zasoby Openzeppelin)
1. kontrakt powinien pozwolić zdefiniować symbol tokena, nazwę tokena tokena w konstruktorze. 
1. kontrakt powinien posiadać funkcję do kupowania tokena. Kontrakt mintuje tokeny w zamian za zdeponowane ETH w ilości 1:1
1. adekwatnie powinien posiadać funkcję, która pozwala wypłacić userowi ETH w zamian za zburnowanie adekwatnej ilości naszego tokena 
1. kontrakt powinien posiadać funkcje administracyjne dostępne dla adresu walleta, który zdeployował kontrakt:
    * pause/unpause możliwości zakupu/sprzedaży tokena z podpunktów b, c;
    * pause/unpause możliwości transferu tokenów
