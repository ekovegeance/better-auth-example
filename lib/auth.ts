import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { nextCookies } from "better-auth/next-js";
import { schema } from "@/db/schema";
import { resend } from "@/lib/email/resend";
import EmailVerification from "@/components/email-templates/email-verification";
import EmailResetPassword from "@/components/email-templates/email-reset-password";

const from = process.env.RESEND_FROM_EMAIL;

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

    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: from as string,
        to: user.email,
        subject: "Reset Password",
        react: EmailResetPassword({
          name: user.name,
          email: user.email,
          resetLink: url,
        }),
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: from as string,
        to: user.email,
        subject: "Verify your email",
        react: EmailVerification({
          name: user.name,
          email: user.email,
          verificationLink: url,
        }),
      });
    },

    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
});
