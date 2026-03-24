// "use server"
// import { MeshTxBuilder } from "@meshsdk/core";
// import { blockchain_provider } from "./provider/provider";
// import { UTxO } from "@meshsdk/core";

// export async function multiSigTx(utxos0: UTxO[], address0: string, address1: string, address2: string) {

//     const utxos1: UTxO[] = await blockchain_provider.fetchAddressUTxOs(address1);
//     const utxos2: UTxO[] = await blockchain_provider.fetchAddressUTxOs(address2);

//     let utxo0: UTxO;
//     let utxo1: UTxO;
//     let utxo2: UTxO;

//     for (const utxo of utxos0) {
//         for (const amount of utxo.output.amount) {
//             if (amount.unit === "lovelace" && Number(amount.quantity) >= 10000000) {
//                 utxo0 = utxo;
//                 break;
//             }
//         }
//     }

//     for (const utxo of utxos1) {
//         for (const amount of utxo.output.amount) {
//             if (amount.unit === "lovelace" && Number(amount.quantity) >= 10000000) {
//                 utxo1 = utxo;
//                 break;
//             }
//         }
//     }

//     for (const utxo of utxos2) {
//         for (const amount of utxo.output.amount) {
//             if (amount.unit === "lovelace" && Number(amount.quantity) >= 10000000) {
//                 utxo2 = utxo;
//                 break;
//             }
//         }
//     }

//     const multiSigTx = new MeshTxBuilder({
//         verbose: true,
//         fetcher: blockchain_provider,
//     })

//     const unsignedTx = await multiSigTx
//     .setNetwork("preprod")
//     .txIn(utxo0!.input.txHash, utxo0!.input.outputIndex)
//     .txIn(utxo1!.input.txHash, utxo1!.input.outputIndex)
//     .txIn(utxo2!.input.txHash, utxo2!.input.outputIndex)
//     .txOut(address0, [{unit: "lovelace", quantity: "15000000"}])
//     .txOut(address1, [{unit: "lovelace", quantity: "10000000"}])
//     .txOut(address2, [{unit: "lovelace", quantity: "5000000"}])
//     .changeAddress(address0)
//     .selectUtxosFrom(utxos0)
//     .complete();

//     return unsignedTx;
// }


"use server"

import {MeshTxBuilder, UTxO} from "@meshsdk/core";
import { blockchain_provider } from "./provider/provider";

export async function multiSigTx(utxos0: UTxO[], address0: string, address1: string, address2: string) {

    let utxos1: UTxO[] = await blockchain_provider.fetchAddressUTxOs(address1)
    let utxos2: UTxO[] = await blockchain_provider.fetchAddressUTxOs(address2)

    let utxo0: UTxO = utxos0.filter(utxo => utxo.output.amount.some(amount => amount.unit === "lovelace" && Number(amount.quantity) >= 10000000))[0];
    let utxo1: UTxO = utxos1.filter(utxo => utxo.output.amount.some(amount => amount.unit === "lovelace" && Number(amount.quantity) >= 10000000))[0];
    let utxo2: UTxO = utxos2.filter(utxo => utxo.output.amount.some(amount => amount.unit === "lovelace" && Number(amount.quantity) >= 10000000))[0];


    if (!(utxo0) || !(utxo1) || !(utxo2)) {
        throw new Error("No UTxO found with enough lovelace");
    }

    const multiSigTx = new MeshTxBuilder({
        verbose: true,
        fetcher: blockchain_provider,
    })

    const unsignedTx = await multiSigTx
    .setNetwork("preprod")
    .txIn(utxo0!.input.txHash, utxo0!.input.outputIndex)
    .txIn(utxo1!.input.txHash, utxo1!.input.outputIndex)
    .txIn(utxo2!.input.txHash, utxo2!.input.outputIndex)
    .txOut(address0, [{unit: "lovelace", quantity: "15000000"}])
    .txOut(address1, [{unit: "lovelace", quantity: "10000000"}])
    .txOut(address2, [{unit: "lovelace", quantity: "5000000"}])
    .changeAddress(address0)
    .selectUtxosFrom(utxos0)
    .complete();

    return unsignedTx;
    
}