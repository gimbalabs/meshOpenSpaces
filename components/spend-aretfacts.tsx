"use client";
import { useState } from "react";
import { useEffect } from "react";
import type { PlutusScript, Data } from "@meshsdk/core";
import { resolvePlutusScriptAddress } from "@meshsdk/core";
import plutusScript from "../test-validator/plutus.json";
import cbor from "cbor";

export default function SpendArifacts() {

    const [Cbor, setCbor] = useState<string>("");
    const [ScriptAddress, setScriptAddress] = useState<string>("");

    useEffect(() => {
        const script: PlutusScript = {
            version: "V3",
            code: cbor
                .encode(Buffer.from(plutusScript.validators[0].compiledCode, "hex"))
                .toString("hex"),
        };
        setCbor(script.code);
        const scriptAddress = resolvePlutusScriptAddress(script, 1);
        setScriptAddress(scriptAddress);
    }, []);
    return (
        <div>
            <p>{Cbor}</p>
            <p>{ScriptAddress}</p>
        </div>
    );
}
