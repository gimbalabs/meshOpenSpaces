"use client";

import { useWallet } from "@meshsdk/react";
import { useState } from "react";

export const BuilderFestTicketButton = () => {
    const { wallet, connected } = useWallet();
    const [txHash, setTxHash] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function handleGetTicket() {
        if (!connected || !wallet) {
            setError("Wallet not connected");
            return;
        }
        setLoading(true);
        setError("");
        setTxHash("");

        try {
            const utxos = await wallet.getUtxos();
            const address = await wallet.getChangeAddress();
            const collateral = await wallet.getCollateral();

            if (!collateral || collateral.length === 0) {
                setError("No collateral set in wallet. Please set collateral in your wallet settings.");
                setLoading(false);
                return;
            }

            const response = await fetch("/api/builder-fest-ticket", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ utxos, address, collateral }),
            });

            const data = await response.json();

            if (data.error) {
                console.log(data.error)
                setError(typeof data.error === "string" ? data.error : data.error.message || "Transaction build failed");
                return;
            }

            if (data.unsignedTx) {
                const signedTx = await wallet.signTx(data.unsignedTx);
                const hash = await wallet.submitTx(signedTx);
                setTxHash(hash);
            }
        } catch (err: any) {
            setError(err.message || "Failed to get ticket");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <button
                onClick={handleGetTicket}
                disabled={!connected || loading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-3 rounded-md font-medium transition-colors"
            >
                {loading ? "Processing..." : "Get Builder Fest Ticket"}
            </button>
            {txHash && (
                <div className="p-3 bg-green-100 rounded-md">
                    <p className="text-green-800 font-medium">Success!</p>
                    <p className="text-green-700 text-sm break-all">TxHash: {txHash}</p>
                </div>
            )}
            {error && (
                <div className="p-3 bg-red-100 rounded-md">
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}
        </div>
    );
};
