import { 
    Asset, 
    conStr, 
    deserializeDatum, 
    integer, 
    mConStr0, 
    MeshTxBuilder, 
    stringToHex 
} from "@meshsdk/core";
import { blockchain_provider, wallet } from "./lib";

export const build_ticket_tx = async (): Promise<string> => {
    const collateral = (await wallet.getCollateral())[0]
    const changeAddress = await wallet.getChangeAddress()
    const utxos = await wallet.getUtxos()

    const ticket_utxos = await blockchain_provider.fetchAddressUTxOs("addr1wywecz65rtwrqrqemhrtn7mrczl7x2c4pqc9hfjmsa3dc7cr5pvqw", "e1ddde8138579e255482791d9fba0778cb1f5c7b435be7b3e42069de425549444c45524645535432303236");
    if(!ticket_utxos) throw new Error("No beacon asset found");
    const ticket_utxo = ticket_utxos[0]

    const reference_utxo = {
        txHash: "31596ecbdcf102c8e5c17e75c65cf9780996285879d18903f035964f3a7499a8",
        output_index: 0
    }
    
    if(!ticket_utxo.output.plutusData) throw new Error("could not find last ticket state");

    const valid_before = Number((await blockchain_provider.fetchLatestBlock()).slot);

    const ticket_utxo_datum = deserializeDatum(ticket_utxo.output.plutusData)
    const ticket_number = ticket_utxo_datum.fields[0].int;

    const ticket_name = stringToHex(`TICKET${Number(ticket_number)}`)
    const txout_datum = conStr(0,[integer(Number(ticket_number) + 1)])

    const ticketer_asset: Asset[] = [{
        quantity: "1",
        unit: "1d9c0b541adc300c19ddc6b9fb63c0bfe32b1508305ba65b8762dc7b" + ticket_name
    }]

    const txBuilder = new MeshTxBuilder({
        submitter: blockchain_provider,
        fetcher: blockchain_provider
    })
    const unsignedTx = await txBuilder
    .spendingPlutusScriptV3()
    .txIn(ticket_utxo.input.txHash, ticket_utxo.input.outputIndex)
    .txInRedeemerValue(mConStr0([]), "Mesh")
    .txInInlineDatumPresent()
    .spendingTxInReference(reference_utxo.txHash, reference_utxo.output_index)

    .invalidBefore(valid_before)
    
    .mintPlutusScriptV3()
    .mint("1", "1d9c0b541adc300c19ddc6b9fb63c0bfe32b1508305ba65b8762dc7b",ticket_name)
    .mintRedeemerValue(mConStr0([]), "Mesh")
    .mintTxInReference(reference_utxo.txHash, reference_utxo.output_index)
    
    .txOut(changeAddress, ticketer_asset)
    
    .txOut(ticket_utxo.output.address, ticket_utxo.output.amount)
    .txOutInlineDatumValue(txout_datum, "JSON")

    .txOut("addr_test1qpp0dm9934w4rxuxq3448l2uq22yxd2lzrelu27t4cnkccqa8hhx2jd4t54h6cvr65l3cfh00dk78nmquc9dljvdm85qrm6vwg", [{
        unit: "lovelace",
        quantity: "50000000"
    }])
    .changeAddress(changeAddress)
    .txInCollateral(collateral.input.txHash,collateral.input.outputIndex)
    .selectUtxosFrom(utxos)
    .setNetwork("preprod")
    .complete() 
     

    return unsignedTx;
}