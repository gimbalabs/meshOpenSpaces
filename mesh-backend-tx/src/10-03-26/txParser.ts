import { TxParser } from "@meshsdk/core";
import { CSLSerializer } from "@meshsdk/core-csl";
import { blockchain_provider } from "../lib";

export const txParser =  async( unsignedTx: string) : Promise<void> => {
    const serialized = new CSLSerializer();
    const txParser = new TxParser(serialized, blockchain_provider)
    
    const txBodyBuilder = await txParser.parse(unsignedTx)
    console.log(txBodyBuilder)
}