import type {Metadata} from 'next'
import './globals.css'
import {fontSans} from '@/lib/font'
import {cn} from '@/lib/utils'
import AuthProvider from '@/providers/auth-provider'
import ToasterProvider from '@/providers/toast-provider'
import {ThemeProvider} from '@/providers/theme-provider'
import {SiteHeader} from '@/components/layout/site-header'
import SiteFooter from '@/components/layout/site-footer'
import {QueryProvider} from '@/providers/query-provider'

export const metadata: Metadata = {
  title: 'Games APP',
  description: 'A simple games app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryProvider>
              <ToasterProvider />
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1">{children}</div>
                <SiteFooter />
              </div>
            </QueryProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
