import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const URL_API = process.env.FLUXO_API_URL || "http://localhost:4000";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-mail", type: "email" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) return null;

        const resposta = await fetch(`${URL_API}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            senha: credentials.senha,
          }),
        });

        if (!resposta.ok) return null;
        return resposta.json();
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.nome;
        token.email = user.email;
        token.papel = user.papel;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.papel = token.papel;
      }
      return session;
    },
    authorized({ auth }) {
      return !!auth;
    },
  },
  pages: { signIn: "/login" },
});
