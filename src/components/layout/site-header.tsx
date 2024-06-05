import {siteConfig} from '@/config/site'
import {MainNav} from './main-nav'
import {ThemeToggle} from '@/components/theme-toggle'
import {UserNav} from './user-nav'
import getCurrentUser from '@/actions/get-current-user'
import Link from 'next/link'
import {cn} from '@/lib/utils'
import {buttonVariants} from '../ui/button'
import {MobileNav} from './mobile-nav'

export async function SiteHeader() {
  const user = await getCurrentUser()
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center sm:justify-between sm:space-x-0 md:space-x-4">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          {user ? (
            <UserNav currentUser={user} />
          ) : (
            <Link
              href="/auth/login"
              className={cn(buttonVariants({variant: 'secondary'}))}
            >
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
