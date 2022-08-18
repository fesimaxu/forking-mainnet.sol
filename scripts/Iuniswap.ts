import { ethers } from "hardhat";

async function main() {
  //interact with uniswap swapTokensForExactTokens function
  //swap usdt to dai
  //TO-DO
  //erc20 token interface
  //Approve the uniswap contract
  //check balance of signer before swap
  //swap token caling the function
  //check balance after swap.

  const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const ETHAddress = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";
  const amountIn = 41011733;
  const amountOutMin = 1e6;

  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  const USDCHolder = "0x798576f0b501a8eb61d914249676e3878584b2ee";
  await helpers.impersonateAccount(USDCHolder);
  const impersonatedSigner = await ethers.getSigner(USDCHolder);

  const USDT = await ethers.getContractAt(
    "IERC20",
    USDCAddress,
    impersonatedSigner
  );
  const DAI = await ethers.getContractAt("IERC20", DAIAddress);
  const ETHI = await ethers.getContractAt("IERC20", ETHAddress);
  const ROUTER = await ethers.getContractAt(
    "IUniSwap",
    UNIRouter,
    impersonatedSigner
  );

  console.log("contract ROUTER", ROUTER);

  const usdcBal = await USDT.balanceOf(USDCHolder);
  const daiBal = await DAI.balanceOf(DAIAddress);
  const ethBal = await ETHI.balanceOf(ETHAddress);

  console.log("balance before swap", usdcBal, daiBal, ethBal);

  const con_signer = await USDT.approve(UNIRouter, amountIn);
  const res_approve = await con_signer.wait();

  console.log("contract signer", res_approve);

  
  const result = await ROUTER.swapExactTokensForTokens(
         amountIn,
         amountOutMin,
        [USDCAddress,DAIAddress],
         USDCHolder,
        1660849728
    )
  console.log(await result.wait());


   const Result = await ROUTER.swapExactTokensForTokensSupportingFeeOnTransferTokens(
         amountIn,
         amountOutMin,
        [USDCAddress,ETHAddress],
         USDCHolder,
        1660849728
    )
  console.log(await Result.wait());


  const usdcBalAfter = await USDT.balanceOf(USDCHolder);
  const daiBalAfter = await DAI.balanceOf(DAIAddress);

  console.log(
    "balance after swap",
    usdcBalAfter.toString(),
    daiBalAfter.toString()
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
