'use client'
import * as React from 'react'
import Link from 'next/link'

import {NavItem} from '@/types'
import {siteConfig} from '@/config/site'
import {cn} from '@/lib/utils'
import Image from 'next/image'
import {usePathname} from 'next/navigation'

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({items}: MainNavProps) {
  const pathname = usePathname()
  return (
    <div className="hidden gap-6 md:flex md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/img/logo.svg"
          alt={siteConfig.name}
          width={45}
          height={45}
        />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex items-center gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'font-medium transition-colors hover:text-foreground/80',
                    pathname === `${item.href}`
                      ? 'text-foreground'
                      : 'text-foreground/60'
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
