export { default } from "./bundlr";
export { default as NodeBundlr } from "./bundlr";

export * from "./bundlr";
export * from "./currency";
export * from "./types";
export * from "./upload";
export * from "../common";

// on demand injection.
export const currencies: Array<[Array<string>, Array<string>]> = [
    [["@bundlr-network/ethereum", "BundlrEthereum"], ["ethereum", "matic", "bnb", "fantom", "avalanche", "boba-eth", "arbitrum"]],
    [["@bundlr-network/arweave", "BundlrArweave"], ["arweave"]],
    [["@bundlr-network/erc20", "BundlrErc20"], ["boba", "chainlink"]],
    [["@bundlr-network/algorand", "BundlrAlgorand"], ["algorand"]],
    [["@bundlr-network/near", "BundlrNear"], ["near"]],
    [["@bundlr-network/solana", "BundlrSolana"], ["solana"]],
    [["@bundlr-network/cosmos", "BundlrCosmos"], ["cosmos", "akash", "kyve"]]
];
// @ts-ignore
globalThis.Bundlr?.currencyArrayMap ? (globalThis.Bundlr.currencyArrayMap.concat(currencies)) : (globalThis.Bundlr = { currencyArrayMap: currencies });
