/* eslint-disable node/no-missing-import */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { WrappedEth } from "../typechain";

describe("WrappedEth", function () {
  let WrappedEth: WrappedEth;
  let signer: SignerWithAddress;
  const name = "WrappedEth";
  const symbol = "WETH";

  beforeEach(async () => {
    const WrappedEthFactory = await ethers.getContractFactory("WrappedEth");
    WrappedEth = await WrappedEthFactory.deploy(name, symbol);
    await WrappedEth.deployed();

    [signer] = await ethers.getSigners();
  });

  describe("deployment", () => {
    it("contract has correct name", async () => {
      expect(await WrappedEth.name()).to.eq(name);
    });

    it("contract has correct symbol", async () => {
      expect(await WrappedEth.symbol()).to.eq(symbol);
    });

    it("contract has zero initial total supply", async () => {
      expect(await WrappedEth.totalSupply()).to.eq(0);
    });
  });

  describe("buy", () => {
    it("rejects when value is zero", async () => {
      await expect(WrappedEth.buy({ value: 0 })).to.be.revertedWith(
        "WrappedEth: value is zero"
      );
    });

    describe("when contract is paused", () => {
      beforeEach(async () => {
        await WrappedEth.pause();
      });

      it("rejects with proper message", async () => {
        await expect(WrappedEth.buy({ value: 1 })).to.be.revertedWith(
          "Pausable: paused"
        );
      });
    });

    describe("and buy call is successful", () => {
      let balanceBefore: BigNumber;
      let totalSupplyBefore: BigNumber;
      let ethBalanceBefore: BigNumber;

      const value = ethers.utils.parseEther("10");

      beforeEach(async () => {
        balanceBefore = await WrappedEth.balanceOf(signer.address);
        totalSupplyBefore = await WrappedEth.totalSupply();
        ethBalanceBefore = await ethers.provider.getBalance(WrappedEth.address);

        await WrappedEth.buy({ value });
      });

      it("increases balance of token", async () => {
        const balanceAfter = await WrappedEth.balanceOf(signer.address);

        expect(balanceAfter).to.eq(balanceBefore.add(value));
      });

      it("increases total supply", async () => {
        const totalSupplyAfter = await WrappedEth.totalSupply();

        expect(totalSupplyAfter).to.eq(totalSupplyBefore.add(value));
      });

      it("increases contract eth balance", async () => {
        const ethBalanceAfter = await ethers.provider.getBalance(
          WrappedEth.address
        );

        expect(ethBalanceAfter).to.eq(ethBalanceBefore.add(value));
      });
    });
  });

  describe("sell", () => {
    const amount = ethers.utils.parseEther("10");

    beforeEach(async () => {
      await WrappedEth.buy({ value: amount });
    });

    it("rejects when amount is zero", async () => {
      await expect(WrappedEth.sell(0)).to.be.revertedWith(
        "WrappedEth: amount is zero"
      );
    });

    it("rejects when balance is insufficient", async () => {
      const doubleAmount = amount.mul(2);

      await expect(WrappedEth.sell(doubleAmount)).to.be.revertedWith(
        "WrappedEth: insufficient token balance"
      );
    });

    describe("when contract is paused", () => {
      beforeEach(async () => {
        await WrappedEth.pause();
      });

      it("rejects with proper message", async () => {
        await expect(WrappedEth.sell(1)).to.be.revertedWith("Pausable: paused");
      });
    });

    describe("and sell call is successful", () => {
      let balanceBefore: BigNumber;
      let totalSupplyBefore: BigNumber;
      let ethBalanceBefore: BigNumber;

      beforeEach(async () => {
        balanceBefore = await WrappedEth.balanceOf(signer.address);
        totalSupplyBefore = await WrappedEth.totalSupply();
        ethBalanceBefore = await ethers.provider.getBalance(WrappedEth.address);

        await WrappedEth.sell(amount);
      });

      it("decreases token balance", async () => {
        const balanceAfter = await WrappedEth.balanceOf(signer.address);

        expect(balanceAfter).to.eq(balanceBefore.sub(amount));
      });

      it("decreases total supply", async () => {
        const totalSupplyAfter = await WrappedEth.totalSupply();

        expect(totalSupplyAfter).to.eq(totalSupplyBefore.sub(amount));
      });

      it("decreases contract eth balance", async () => {
        const ethBalanceAfter = await ethers.provider.getBalance(
          WrappedEth.address
        );

        expect(ethBalanceAfter).to.eq(ethBalanceBefore.sub(amount));
      });
    });
  });
});
