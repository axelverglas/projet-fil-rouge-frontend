import {siteConfig} from '@/config/site'
import {MainNav} from './main-nav'
import {ThemeToggle} from '@/components/theme-toggle'
import {UserNav} from './user-nav'
import {currentUser} from '@/actions/get-current-user'
import Link from 'next/link'
import {cn} from '@/lib/utils'
import {buttonVariants} from '../ui/button'

export async function SiteHeader() {
  const user = await currentUser()
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
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
