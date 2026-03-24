// import { NextResponse } from "next/server";
// import { multiSigTx } from "@/server/multiSigTx";
// import { UTxO } from "@meshsdk/core";


// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//         const { utxos0, address0, address1, address2 } = body;
//         const result = await multiSigTx(utxos0 as UTxO[], address0 as string, address1 as string, address2 as string);
//         if (result != null) {
//             return NextResponse.json(
//                 { unsignedTx: result },
//                 { status: 200 }
//             );
//         }
//     } catch (error: any) {
//         return NextResponse.json(
//             { error: error.message || "Internal server error" },
//             { status: 500 }
//         );
//     }
// }


import { NextResponse } from "next/server";
import { multiSigTx } from "@/server/multiSigTx";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { utxos0, address0, address1, address2 } = body;
        const result = await multiSigTx(utxos0, address0, address1, address2);
        if (result != null) {
            return NextResponse.json(
                { unsignedTx: result },
                { status: 200 }
            );
        }
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }

}
