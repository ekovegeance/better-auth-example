import React from 'react';
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import UserCard from "@/components/landing/user-card";

export default async function LandingPage() {
    try {
        const [session, activeSessions] = await Promise.all([
            auth.api.getSession({
                headers: await headers()
            }),
            auth.api.listSessions({
                headers: await headers()
            })
        ]);
        console.log("Log Session from Server Side", session);
        console.log("Log Active Sessions from Server Side", activeSessions.length);
        return (
            <section className="px-4 md:px-12 flex flex-col md:flex-row items-center justify-between ">
                <div className="py-12">
                    <h1 className="text-4xl font-bold">Welcome to Better Auth</h1>
                    <p className="mt-2 text-lg">An example application using Better Auth.</p>
                    <p className="mt-4 text-teal-700 font-semibold">
                        {session ? `Hello, ${session.user.name}!` : "You are not logged in."}
                    </p>
                </div>
                <div className="w-full max-w-lg">
                    {session && session.user && <UserCard session={session} activeSessions={activeSessions} />}
                </div>
            </section>
        );
    } catch (error) {
        console.error("Server Component Error:", error);
        return (
            <section>
                <h1 className="text-2xl font-bold text-red-600">An error occurred</h1>
                <p>{error instanceof Error ? error.message : "Unknown error"}</p>
            </section>
        );
    }
}