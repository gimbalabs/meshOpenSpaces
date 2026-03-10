// "use client";
// import { useWallet } from "@meshsdk/react";
// import {useState} from "react";

// export const DeployRefScriptButton = () => {
//     const { connected, wallet } = useWallet();
//     const [txHash, setTxHash] = useState<string>("");
//     const [error, setError] = useState<string>("");
//     const [loading, setLoading] = useState<boolean>(false);

//     const refAddress = "addr_test1qqz35lul425c69g235w7ck07ddmpe6d3j65hq36yuf53kelty7fr4yckrylzx3fpltw7vuc3aa9nulklcw4rz3u6tf9sc7tpuy";

//     async function handleDeployRefScript() {
//         if (!connected || !wallet) {
//             setError("Wallet not connected");
//             return;
//         }
//         setLoading(true);
//         setError("");
//         setTxHash("");

//         const utxos = await wallet.getUtxos();
//         const changeAddress = await wallet.getChangeAddress();

//         const response = await fetch("/api/deploy-ref-script", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ utxos, refAddress, changeAddress }),
//         });

//         const data = await response.json();

//         if (data.error) {
//             console.log(data.error)
//             setError(typeof data.error === "string" ? data.error : data.error.message || "Transaction build failed");
//             return;
//         }

//         try {
//             if (data && data.unsignedTx != null) {
//                 const signedTx = await wallet.signTx(data.unsignedTx);
//                 const txHash = await wallet.submitTx(signedTx);
//                 setTxHash(txHash);
//             }   
//         } catch (error: any) {
//             setError(error.message || "Failed to deploy reference script");
//         } finally {
//             setLoading(false);
//         }
//     }
//     return (
//         <div>
//             <button onClick={handleDeployRefScript}>Deploy Reference Script</button>
//             {txHash && <p>Transaction Hash: {txHash}</p>}
//             {error && <p>Error: {error}</p>}
//             {loading && <p>Loading...</p>}
//         </div>
//     )
// }

"use client";

import { useWallet } from "@meshsdk/react";
import {useState} from "react";

export const DeployRefScriptButton = () => {
    const { wallet, connected } = useWallet();
    const [txHash, setTxHash] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const refAddress = "addr_test1qqz35lul425c69g235w7ck07ddmpe6d3j65hq36yuf53kelty7fr4yckrylzx3fpltw7vuc3aa9nulklcw4rz3u6tf9sc7tpuy"

    async function handleDeployRefScript() {
        if (!connected || !wallet) {
            setError("Wallet not connected");
            return;
        }

        setLoading(true);
        setError("");
        setTxHash("");

        try {
            const utxos = await wallet.getUtxos();
            const changeAddress = await wallet.getChangeAddress();

            const response = await fetch("/api/deploy-ref-script", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ utxos, refAddress, changeAddress }),
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
            setError(err.message || "Failed to deploy reference script");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <button onClick={handleDeployRefScript}>Deploy Reference Script</button>
            {txHash && <p>Transaction Hash: {txHash}</p>}
            {error && <p>Error: {error}</p>}
            {loading && <p>Loading...</p>}
        </div>)
    }