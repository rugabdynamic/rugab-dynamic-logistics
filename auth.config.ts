import type { NextAuthConfig } from "next-auth";

// Edge-safe config (no Prisma / bcrypt here) so it can be imported by middleware.
// The Credentials provider with its DB lookup lives in auth.ts.
export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    // Persist role + id onto the JWT and expose them on the session.
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "CUSTOMER";
        token.id = user.id as string;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [], // populated in auth.ts
};
