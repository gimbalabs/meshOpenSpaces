import { conStr, conStr0, MeshTxBuilder, PlutusScript, resolvePlutusScriptAddress, stringToHex, toBytes } from "@meshsdk/core"
import cbor from "cbor"
import { blockchain_provider, wallet } from "./lib";

const scriptCbor = "58a001010029800aba2aba1aab9faab9eaab9dab9a48888896600264653001300700198039804000cc01c0092225980099b8748008c01cdd500144c8cc896600266e1d2000300a375400d1323259800980800144cdc79bae300f300d37540109110d48656c6c6f2c20576f726c6421008b201c375c601c00260166ea801a2c8048c02c004c02cc030004c020dd50014590060c01c004c00cdd5003c52689b2b20021"
const encoded_script = cbor.encode(Buffer.from(scriptCbor, "hex")).toString("hex")

const spend = async() => {
    const utxo = await wallet.getUtxos();
    const collateral = (await wallet.getCollateral())[0];
    const changeAddress = await wallet.getChangeAddress();
    console.log(utxo)


const hello_mesh_plutusScript: PlutusScript = {
    code: encoded_script,
    version: "V3",
};
const script_address = resolvePlutusScriptAddress(hello_mesh_plutusScript, 0);

const redeemer_msg = stringToHex("Hello, World!");
const redeemer_value = conStr0([redeemer_msg])

const txbuilder = new MeshTxBuilder({
    fetcher: blockchain_provider,
    submitter: blockchain_provider,
    verbose: true
})


const unsignedTx = await txbuilder
.spendingPlutusScriptV3()
.txIn("2270fe44bcf9fd0ddb60da11d1a8132981d18dc64e236a4aa3903a13b8c86ad5",0)
.txInRedeemerValue(redeemer_value, "JSON")
.txInInlineDatumPresent()
.txInScript(encoded_script)

.txOut(changeAddress, [{
    quantity: "10000000",
    unit: "lovelace"
}])
.changeAddress(changeAddress)
.txInCollateral(collateral.input.txHash, collateral.input.outputIndex)
.selectUtxosFrom(utxo)
.setNetwork("preprod")
.complete()

const signedTx = await wallet.signTx(unsignedTx)
const txHash = await wallet.submitTx(signedTx);
console.log('txHash' , txHash)
return txHash;
}

spend();