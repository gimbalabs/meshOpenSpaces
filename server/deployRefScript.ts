// import plutusScript from "../hello-mesh/plutus.json";
// import cbor from "cbor";
// import type { PlutusScript, Data } from "@meshsdk/core";
// import { UTxO } from "@meshsdk/core";
// import { blockchain_provider } from "./provider/provider";
// import { MeshTxBuilder } from "@meshsdk/core";
// import { conStr0 } from "@meshsdk/core";


// export async function deployRefScript(utxos: UTxO[], refAddress: string, changeAddress: string) {
//     const script: PlutusScript = {
//         code: cbor
//             .encode(Buffer.from(plutusScript.validators[0].compiledCode, "hex"))
//             .toString("hex"),
//         version: "V3",
//     };

//     const tx = new MeshTxBuilder({
//         verbose: true,
//         fetcher: blockchain_provider,
//     });

//     const unsignedTx = await tx
//     .txOut(refAddress, [])
//     // .txOutInlineDatumValue(conStr0([]),"JSON")
//     .txOutReferenceScript(script.code, "V3")
//     .changeAddress(changeAddress)
//     .selectUtxosFrom(utxos)
//     .setNetwork("preprod")
//     .complete()

//     try{
//         return {
//             unsignedTx,
//             error: null
//         } 
//     }catch (error) {
//         console.log(error)
//         return {
//             unsignedTx: null,
//             error: error
//         }
//     }
// }


import plutusScript from "../hello-mesh/plutus.json";
import cbor from "cbor";
import type { PlutusScript, Data } from "@meshsdk/core";
import { UTxO } from "@meshsdk/core";
import { blockchain_provider } from "./provider/provider";
import { MeshTxBuilder } from "@meshsdk/core";


export async function deployRefScript(utxos: UTxO[], refAddress: string, changeAddress: string) {
    const script: PlutusScript = {
        code: cbor
            .encode(Buffer.from(plutusScript.validators[0].compiledCode, "hex"))
            .toString("hex"),
        version: "V3",
    };

    const tx = new MeshTxBuilder({
        verbose: true,
        fetcher: blockchain_provider,
    });

    const unsignedTx = await tx
    .txOut(refAddress, [])
    // .txOutInlineDatumValue(conStr0([]),"JSON")
    .txOutReferenceScript(script.code, "V3")
    .changeAddress(changeAddress)
    .selectUtxosFrom(utxos)
    .setNetwork("preprod")
    .complete()

    try{
        return {
        unsignedTx,
        error: null
    }
    } catch (error) {
        console.log(error)
        return {
            unsignedTx: null,
            error: error
        }
    }
}