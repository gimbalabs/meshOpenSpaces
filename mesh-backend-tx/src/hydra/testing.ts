// Check Hydra head balance 
// deposit from cardano L1 to hydra L2

import { clientInput, HydraInstance, HydraProvider, hydraReferenceScript, hydraUTxO } from "@meshsdk/hydra"
import { blockchain_provider, wallet } from "../lib"

const emmanuelNodeConfig = {
    url: "http://localhost:4002"
}

const provider = new HydraProvider({
  httpUrl: emmanuelNodeConfig.url
})

const instance = new HydraInstance({
    provider: provider,
    fetcher: blockchain_provider,
    submitter: blockchain_provider
})

await provider.connect()
provider.onMessage((message) => {
    console.log("Hydra message:", message);
});

const commitTx = await instance.commitEmpty()
const txHash = await wallet.submitTx(commitTx);
console.log("Empty commit submitted:", txHash);
