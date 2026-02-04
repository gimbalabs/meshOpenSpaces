// import { NextResponse } from "next/server";
// import { deployRefScript } from "@/server/deployRefScript";
// import { UTxO } from "@meshsdk/core";

// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//         const { utxos, refAddress, changeAddress } = body;
//         const result = await deployRefScript(utxos as UTxO[], refAddress as string, changeAddress as string);
//         if (!!result.error && result.error instanceof Error) {
//             console.log(result.error)
//             return NextResponse.json(
        
//                 { error: result.error },
//                 { status: 500 }
//             );      
            
//         }
//         if (result.unsignedTx) {
//             return NextResponse.json(
//                 { unsignedTx: result.unsignedTx },
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
import { deployRefScript } from "@/server/deployRefScript";
import { UTxO } from "@meshsdk/core";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { utxos, refAddress, changeAddress } = body;
        const result = await deployRefScript(utxos as UTxO[], refAddress as string, changeAddress as string);
        
        if (result.error instanceof Error) {
            console.log(result.error)
            return NextResponse.json(
        
                { error: result.error },
                { status: 500 }
            );      
            
        }
        if (result.unsignedTx) {
            return NextResponse.json(
                { unsignedTx: result.unsignedTx },
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