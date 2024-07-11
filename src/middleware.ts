import {withAuth} from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/login'
  }
})

export const config = {
  matcher: [
    '/settings/:path*',
    '/profil/:path*',
    '/api/:path*',
    '/chat/:path*, /games/:path*'
  ]
}
