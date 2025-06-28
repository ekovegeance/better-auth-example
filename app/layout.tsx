import type {Metadata} from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner"
import React, {ReactNode} from "react";


const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
    title: "Better Auth Example",
    description: "An example application using Better Auth",
};

export default function RootLayout({children,}: Readonly<{children: ReactNode;}>) {

    return (
        <html lang="en">
        <body
            className={`${plusJakartaSans.className} ${plusJakartaSans.className} antialiased`}
        >
        {children}
        <Toaster/>
        </body>
        </html>
    );
}
