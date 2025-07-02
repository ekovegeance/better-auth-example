import { betterAuth } from "better-auth"
import { drizzleAdapter} from "better-auth/adapters/drizzle";
import { db } from "@/db";
import {nextCookies} from "better-auth/next-js";
import {schema} from "@/db/schema";
import { resend } from "@/lib/email/resend";


const from = process.env.RESEND_FROM_EMAIL

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),

  plugins: [nextCookies()],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const rest = await resend.emails.send({
        from: from as string,
        to: user.email,
        subject: "Verify your email",
        html: `<a href="${url}">Verify your email address</a>`,
      });
      console.log("Email sent:", rest, "to:", user.email, "url:", url);
    },
    
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
});