import {User} from '@/types'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: User
    access_token: string
    refresh_token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User
    access_token_exp: number
    access_token: string
    refresh_token: string
  }
}
