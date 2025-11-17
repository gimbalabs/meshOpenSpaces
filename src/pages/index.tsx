import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start gap-10 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-row gap-2 w-full justify-between">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
            <Image
              className="dark:invert"
              src="/gmbl-dark.png"
              alt="Gimbalabs logo"
              width={150}
              height={20}
              priority
            />
            <Image
              className="dark:invert"
              src="/logo-mesh-vector.svg"              
              alt="Mesh Logo"
              width={100}
              height={20}
              priority
            />

        </div>
       
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Gimbalabs x Mesh Open Spaces 2025/26
          </h1>
         
        </div>
       
      </main>
    </div>
  );
}
