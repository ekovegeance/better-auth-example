import { betterAuth } from "better-auth"
import { drizzleAdapter} from "better-auth/adapters/drizzle";
import { db } from "@/db";
import {nextCookies} from "better-auth/next-js";
import {schema} from "@/db/schema";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,

    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema,
        }
    }),

    emailAndPassword: {
        enabled: true,
    },

    plugins: [nextCookies()]
})