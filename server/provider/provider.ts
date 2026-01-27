import { BlockfrostProvider } from "@meshsdk/core";

const provider = process.env.BLOCKFROST_APIKEY;
if(!provider){
    throw new Error(" blockchain provider not set")
}
export const blockchain_provider = new BlockfrostProvider(provider);