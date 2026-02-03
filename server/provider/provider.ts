import { BlockfrostProvider } from "@meshsdk/core";

const provider = process.env.BLOCKFROST;
console.log("[provider] BLOCKFROST set:", !!provider, "length:", provider?.length ?? 0);
if(!provider){
    throw new Error(" blockchain provider not set")
}
export const blockchain_provider = new BlockfrostProvider(provider);