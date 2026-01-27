/*import { BlockfrostProvider, MeshWallet } from "@meshsdk/core"


export const seed_phrase = process.env.SEED_PHRASE?.split(" ")
if(!seed_phrase){
    throw new Error("Enter seedphrase in .env file")
}
 const provider = process.env.BLOCKFROST_APIKEY;
if(!provider){
    throw new Error(" blockchain provider not set")
}
export const blockchain_provider = new BlockfrostProvider(provider);

export const wallet = new MeshWallet({
    networkId: 0,
    fetcher: blockchain_provider,
    submitter: blockchain_provider,
    key: {
      type: "mnemonic",
      words: seed_phrase
    }
})
*/