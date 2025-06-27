import Navbar from "@/components/navbar";
import {ReactNode} from "react";

export default function DashboardLayout({children,}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        <main>
            <Navbar/>
            <section className="container px-4 md:px-12">
            {children}
            </section>
        </main>
        </body>
        </html>
    )
}