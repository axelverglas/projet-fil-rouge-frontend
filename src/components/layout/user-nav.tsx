'use client'
import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {User} from '@/types'
import {signOut} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

interface UserNavProps {
  currentUser: User
}

export function UserNav({currentUser}: UserNavProps) {
  const initial = currentUser.username?.charAt(0).toUpperCase()

  const handleLogout = async () => {
    await signOut()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
            {currentUser.avatar_url ? (
              <Image
                src={currentUser.avatar_url}
                alt={currentUser.username}
                width={60}
                height={60}
              />
            ) : (
              <Image
                src="/img/placeholder.jpeg"
                alt="Avatar"
                className="aspect-square h-full w-full"
                width={32}
                height={32}
              />
            )}

            <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
              {initial}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {currentUser.username}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profil">Profil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/profil/friends">Amis</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
