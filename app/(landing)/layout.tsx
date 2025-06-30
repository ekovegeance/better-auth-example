import Navbar from "@/components/navbar/navbar";
import {ReactNode} from "react";

export default function DashboardLayout({children,}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        <main>
            <Navbar/>
            <section className="container mx-auto px-4 py-8">
            {children}
            </section>
        </main>
        </body>
        </html>
    )
}