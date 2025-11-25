"use client";
import { useEffect, useState } from "react";
import { useWallet } from "@meshsdk/react";
import { UTxO } from "@meshsdk/core";


export const useArtefact = () => {
    const { wallet, connected } = useWallet();
    const [utxos, setUtxos] = useState<UTxO[]>([]);
    const [collateral, setCollateral] = useState<UTxO[]>([]);
    useEffect(() => {
        const fetchUtxos = async () => {
            if (connected && wallet) {
                const Utxos = await wallet.getUtxos();
                setUtxos(Utxos);
                const collateral = await wallet.getCollateral();
                setCollateral(collateral);
            }
        };
        fetchUtxos();
    }, [connected, wallet]);
    return { utxos, collateral };
}
