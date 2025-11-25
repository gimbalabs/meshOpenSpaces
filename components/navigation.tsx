"use client";
// import { useWallet } from "@meshsdk/react";
import { CardanoWallet } from "@meshsdk/react";

export default function Navigation() {
    // const { connected, connect } = useWallet();
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 bg-gray-500">
            <CardanoWallet />
        </nav>
    );
}