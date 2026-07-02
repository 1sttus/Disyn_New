import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@disyn.dev" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const envEmail = process.env.ADMIN_EMAIL || "admin@disyn.dev";
        const envPassword = process.env.ADMIN_PASSWORD || "AdminDisynPassword2026!";

        // 1. Try finding in DB
        try {
          let user = await db.user.findUnique({
            where: { email: credentials.email },
          });

          // 2. Fallback: If not in DB but matches Env credentials, auto-create the DB entry
          if (!user && credentials.email === envEmail) {
            if (credentials.password === envPassword) {
              const hashedPassword = await bcrypt.hash(envPassword, 10);
              user = await db.user.create({
                data: {
                  email: envEmail,
                  password: hashedPassword,
                  name: "Admin User",
                },
              });
            }
          }

          if (user) {
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (isValid) {
              return {
                id: user.id,
                email: user.email,
                name: user.name || "Admin User",
              };
            }
          }
        } catch (dbError) {
          console.error("Database error during authorization:", dbError);
          // 3. Complete fail-safe: If DB is down/not configured, authenticate from env variables directly
          if (credentials.email === envEmail && credentials.password === envPassword) {
            return {
              id: "env-admin-fallback-id",
              email: envEmail,
              name: "Admin (Env Fallback)",
            };
          }
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-fallback-key-for-nextauth",
};
export default authOptions;
