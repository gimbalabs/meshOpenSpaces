// "use client";

// import { useWallet } from "@meshsdk/react";
// import { useState } from "react";


// export const UnsignedTxForm = () => {
//     const { wallet, connected } = useWallet();
//     const [address1, setAddress1] = useState<string>("");
//     const [address2, setAddress2] = useState<string>("");
//     const [unsignedTx, setUnsignedTx] = useState<string>("");
//     const [oneSignedTx, setOneSignedTx] = useState<string>("");
//     const [error, setError] = useState<string>("");
//     const [building, setBuilding] = useState(false);
//     const [signing, setSigning] = useState(false);

//     async function handleUnsignedTx() {
//         if (!connected || !wallet) {
//             setError("Wallet not connected");
//             return;
//         }
//         const a1 = address1.trim();
//         const a2 = address2.trim();
//         if (!a1 || !a2) {
//             setError("Enter both co-signer addresses.");
//             return;
//         }
//         setBuilding(true);
//         setError("");
//         setUnsignedTx("");
//         setOneSignedTx("");

//         try {
//             const utxos0 = await wallet.getUtxos();
//             const address0 = await wallet.getChangeAddress();

//             const response = await fetch("/api/multisig-tx", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     utxos0,
//                     address0,
//                     address1: a1,
//                     address2: a2,
//                 }),
//             });
//             const data = await response.json();

//             if (!response.ok || data.error) {
//                 setError(
//                     typeof data.error === "string"
//                         ? data.error
//                         : data.error?.message || "Failed to build transaction",
//                 );
//                 return;
//             }
//             if (data.unsignedTx) {
//                 setUnsignedTx(data.unsignedTx);
//             } else {
//                 setError("No unsigned transaction returned.");
//             }
//         } catch (err: unknown) {
//             setError(err instanceof Error ? err.message : "Internal server error");
//         } finally {
//             setBuilding(false);
//         }
//     }

//     async function handleSignOnce() {
//         if (!connected || !wallet || !unsignedTx) {
//             setError("Build an unsigned transaction first.");
//             return;
//         }
//         setSigning(true);
//         setError("");
//         try {
//             const signed = await wallet.signTx(unsignedTx);
//             setOneSignedTx(signed);
//         } catch (err: unknown) {
//             setError(err instanceof Error ? err.message : "Signing failed");
//         } finally {
//             setSigning(false);
//         }
//     }

//     return (
//         <div>
//             <div>
//                 address1{" "}
//                 <input value={address1} onChange={(e) => setAddress1(e.target.value)} />
//             </div>
//             <div>
//                 address2{" "}
//                 <input value={address2} onChange={(e) => setAddress2(e.target.value)} />
//             </div>
//             <button type="button" onClick={handleUnsignedTx} disabled={building || signing || !connected}>
//                 {building ? "wait" : "unsignedTx"}
//             </button>
//             {unsignedTx && (
//                 <>
//                     <pre>{unsignedTx}</pre>
//                     <button type="button" onClick={handleSignOnce} disabled={signing}>
//                         {signing ? "wait" : "sign -> oneSignedTx"}
//                     </button>
//                 </>
//             )}
//             {oneSignedTx && <pre>{oneSignedTx}</pre>}
//             {error && <div>{error}</div>}
//             {!connected && <div>wallet not connected</div>}
//         </div>
//     );
// }


"use client"

import { useWallet } from "@meshsdk/react";
import { useState } from "react";

export const UnsignedTxForm = () => {
    const { wallet, connected } = useWallet();
    const [address1, setAddress1] = useState<string>("");
    const [address2, setAddress2] = useState<string>("");
    const [unsignedTx, setUnsignedTx] = useState<string>("");
    const [oneSignedTx, setOneSignedTx] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [building, setBuilding] = useState(false);
    const [signing, setSigning] = useState(false);

    async function handleUnsignedTx() {
        if (!connected || !wallet) {
            setError("Wallet not connected");
            return;
        }
        const a1 = address1.trim();
        const a2 = address2.trim();
        if (!a1 || !a2) {
            setError("Enter both co-signer addresses.");
            return;
        }
        setBuilding(true);
        setError("");
        setUnsignedTx("");
        setOneSignedTx("");

        try {
            const utxos0 = await wallet.getUtxos();
            const address0 = await wallet.getChangeAddress();
            const response = await fetch("/api/multisig-tx", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ utxos0, address0, address1: a1, address2: a2 }),
            });
            const data = await response.json();
            if (!response.ok || data.error) {
                setError(
                    typeof data.error === "string"
                        ? data.error
                        : data.error?.message || "Failed to build transaction",
                );
                return;
            }
            if (data.unsignedTx) {
                setUnsignedTx(data.unsignedTx);
            } else {
                setError("No unsigned transaction returned.");
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Internal server error");
        } finally {
            setBuilding(false);
        }
    }

    async function handleSignOnce() {
        if (!connected || !wallet || !unsignedTx) {
            setError("Build an unsigned transaction first.");
            return;
        }
        setSigning(true);
        setError("");
        try {
            const signed = await wallet.signTx(unsignedTx);
            setOneSignedTx(signed);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Signing failed");
        } finally {
            setSigning(false);
        }
    }

    return (
        <>
        <div>
            <div>
                address1{" "}
                <input value={address1} onChange={(e) => setAddress1(e.target.value)} />
            </div>
            <div>
                address2{" "}
                <input value={address2} onChange={(e) => setAddress2(e.target.value)} />
            </div>
        </div>
        <button type="button" onClick={handleUnsignedTx} disabled={building || signing || !connected}>
            {building ? "wait" : "unsignedTx"}
        </button>
        {unsignedTx && (
            <>
                <pre>{unsignedTx}</pre>
                <button type="button" onClick={handleSignOnce} disabled={signing}>
                    {signing ? "wait" : "sign -> oneSignedTx"}
                </button>
            </>
        )}
        {oneSignedTx && <pre>{oneSignedTx}</pre>}
        {error && <div>{error}</div>}
        {!connected && <div>wallet not connected</div>}
        </>
    )
}