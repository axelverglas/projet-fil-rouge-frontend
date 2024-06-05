import {AuthOptions} from 'next-auth'
import {JWT} from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + '/auth/refresh-token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({refresh_token: token.refresh_token})
    }
  )
  const response = await res.json()

  return {
    ...response,
    access_token_exp: Date.now() + 30 * 60 * 1000
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'text'},
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            }),
            headers: {'Content-Type': 'application/json'}
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error)
        }

        return data
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/',
    error: '/auth/error'
  },
  callbacks: {
    async jwt({token, user}) {
      if (user)
        return {
          ...token,
          ...user,
          access_token_exp: Date.now() + 30 * 60 * 1000
        }
      if (new Date().getTime() < token.access_token_exp) return token

      return await refreshToken(token)
    },

    async session({token, session}) {
      session.user = token.user
      session.access_token = token.access_token
      session.refresh_token = token.refresh_token

      return session
    }
  }
}

export default authOptions
