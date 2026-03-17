import { MeshTxBuilder } from "@meshsdk/core";
import {  wallet } from "../lib";

const walletUtxos = await wallet.getUtxos();
const changeAddress = await wallet.getChangeAddress();

const txBuilder = new MeshTxBuilder({});
let txHex: string;

export const builder1 = async () => {
  const unsignedTx = await txBuilder
    .txOut(changeAddress, [
      {
        unit: "lovelace",
        quantity: "20000000",
      },
      {
        unit: "a8d770ae253e4818feb0a5f55dc29d85d86061feee7cc31347276322616964506f642d61646d696e",
        quantity: "50",
      },
    ])
    .changeAddress(changeAddress)
    .selectUtxosFrom(walletUtxos)
    .completeSync(); //note to check

  txHex = await wallet.signTx(unsignedTx);
  console.log("txhex", txHex);
};

export const builder2 = async () => {
  const unsignedTx = await txBuilder
    .chainTx(txHex)
    .txOut("addr_test1wz9jfvnprkxl6szkszch0gadmqllfrw5gl2p667d89ck28cetsw3w", [
      {
        unit: "lovelace",
        quantity: "5000000",
      },
      {
        unit: "a8d770ae253e4818feb0a5f55dc29d85d86061feee7cc31347276322616964506f642d61646d696e",
        quantity: "40",
      },
    ])
    .complete();

  const signedTx = await wallet.signTx(unsignedTx);
  const txHash = await wallet.submitTx(signedTx);
  return txHash;
};
