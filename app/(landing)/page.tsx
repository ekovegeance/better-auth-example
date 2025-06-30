import React from 'react';
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import UserCard from "@/components/landing/user-card";

export default async function LandingPage() {
    const session = await auth.api.getSession({headers: await headers()})
    console.log("Log Session from Server Side",session)
    return (
      <section className="px-4 md:px-12 flex flex-col md:flex-row items-center justify-between ">
          <div className="py-12">
                <h1 className="text-4xl font-bold">Welcome to Better Auth</h1>
                <p className="mt-2 text-lg">An example application using Better Auth.</p>
                <p className="mt-4 text-teal-700">
                    {session ? `Hello, ${session.user.name}!` : "You are not logged in."}
                </p>
          </div>
          <div className="w-full max-w-lg">
              {session && session.user &&  <UserCard user={session?.user}/>}
          </div>
      </section>
    );
}