import React from 'react';
import {auth} from "@/auth";
import {headers} from "next/headers";

export default async function LandingPage() {
    const session = await auth.api.getSession({headers: await headers()})
    console.log("Log Session from Server Side",session)
    return (
      <section className="container px-4 md:px-12">
          <div className="py-12">
                <h1 className="text-4xl font-bold">Welcome to Better Auth</h1>
                <p className="mt-2 text-lg">An example application using Better Auth.</p>
                <p className="mt-4 text-teal-700"></p>
          </div>
      </section>
    );
}