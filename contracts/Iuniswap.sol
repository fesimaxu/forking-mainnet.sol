// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

interface IUniSwap {
    // Swaps an exact amount of input tokens for as many output tokens as possible, along the route determined by the path.
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    // Swaps an exact amount of input tokens for as many output tokens as possible with a transfer fee, along the route determined by the path.
    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;
}
