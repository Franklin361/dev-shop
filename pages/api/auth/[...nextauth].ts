import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { dbUser } from "../../../database"

const providers = {
  githubClientId: process.env.GITHUB_ID as string,
  githubClientSecret: process.env.GITHUB_SECRET as string,
}

export default NextAuth({
  providers: [

    GithubProvider({
      clientId: providers.githubClientId,
      clientSecret: providers.githubClientSecret
    }),

    Credentials({
      name: 'Custom Log In',
      credentials: {
        email: { label: 'E-mail', type: 'email', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password', placeholder: '*******' },
      },
      async authorize(credentials) {
        return await dbUser.checkoutUserEmailPassword(credentials!.email, credentials!.password)
      }
    })

  ],

  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400
  },

  callbacks: {

    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
        switch (account.type) {
          case 'credentials':
            token.user = user
            break;
          case 'oauth':
            token.user = await dbUser.oAuthToDbUser(user?.email || '', user?.name || '')
            break;
        }
      }
      return token
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user = token.user as any

      return session
    },
  }
})

