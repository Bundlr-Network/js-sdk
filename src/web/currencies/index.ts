import BaseCurrency from "../currency";
import EthereumConfig from "./ethereum";
import SolanaConfig from "./solana";

export default function getCurrency(currency: string, wallet: any, providerUrl?: string): BaseCurrency {
    switch (currency) {
        // case "ethereum":
        //     return new EthereumConfig({ name: "ethereum", ticker: "ETH", minConfirm: 5, wallet })
        case "matic":
            return new EthereumConfig({ name: "matic", ticker: "MATIC", providerUrl: providerUrl ?? "https://polygon-rpc.com", minConfirm: 5, wallet })
        case "solana":
            return new SolanaConfig({ name: "solana", ticker: "SOL", providerUrl: providerUrl ?? "https://api.mainnet-beta.solana.com/", minConfirm: 5, wallet })
        default:
            throw new Error(`Unknown/Unsupported currency ${currency}`);
    }
}


