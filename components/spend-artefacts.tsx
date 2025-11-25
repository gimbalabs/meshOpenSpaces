"use client";
import plutusScript from "../hello-mesh/plutus.json";
import cbor from "cbor";
import type { PlutusScript, Data } from "@meshsdk/core";
import { resolvePlutusScriptAddress } from "@meshsdk/core";
import { useState, useEffect } from "react";
import { useArtefact } from "../hooks/useArtefact";
import { UTxO } from "@meshsdk/core";

export default function SpendArtefacts() {
    const [Cbor, setCbor] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const { utxos, collateral } = useArtefact();
    useEffect(() => {
        const script: PlutusScript = {
            code: cbor
                .encode(Buffer.from(plutusScript.validators[0].compiledCode, "hex"))
                .toString("hex"),
            version: "V3",
        };
        setCbor(script.code);

        const plutusScriptAddress = resolvePlutusScriptAddress(script, 0);
        setAddress(plutusScriptAddress);
    }, []);
    return (
        <div>
            <p>Plutus Script: {Cbor}</p>
            <p>Plutus Script Address: {address}</p>
            {utxos.map((utxo: UTxO, index) => (
                <p key={index}>{utxo?.output?.amount.map((asset) => asset.unit)}</p>
            ))}
        </div>
    );
}

