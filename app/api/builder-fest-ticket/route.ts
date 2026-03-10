import { NextResponse } from "next/server";
import { build_ticket_tx } from "@/server/builder-fest";
import { UTxO } from "@meshsdk/core";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { utxos, address, collateral } = body;
        const result = await build_ticket_tx(collateral[0] as UTxO, address as string, utxos as UTxO[]);
        if (!!result.error && result.error instanceof Error) {
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