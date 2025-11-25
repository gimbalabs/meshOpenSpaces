"use client";

import { MeshProvider } from "@meshsdk/react";

export default function MeshWrapper({ children }: { children: React.ReactNode }) {
    return (
        <MeshProvider>
            {children}
        </MeshProvider>
    );
}