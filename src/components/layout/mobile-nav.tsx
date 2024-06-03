'use client'

import * as React from 'react'
import Link, {LinkProps} from 'next/link'
import {useRouter} from 'next/navigation'

import {siteConfig} from '@/config/site'
import {cn} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import {ScrollArea} from '@/components/ui/scroll-area'
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet'
import {LayoutGridIcon} from 'lucide-react'
import {usePathname} from 'next/navigation'
import Image from 'next/image'

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <span className="sr-only">Toggle Menu</span>
          <LayoutGridIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center space-x-2"
          onOpenChange={setOpen}
        >
          <Image
            src="/img/logo.svg"
            alt={siteConfig.name}
            width={45}
            height={45}
          />
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-2">
            {siteConfig.mainNav.map((item, index) => (
              <div key={index} className="flex flex-col">
                <React.Fragment key={item.href}>
                  <MobileLink
                    href={item.href}
                    onOpenChange={setOpen}
                    className={cn(
                      'transition-colors hover:text-foreground/80',
                      pathname === `${item.href}`
                        ? 'text-foreground'
                        : 'text-foreground/60'
                    )}
                  >
                    {item.title}
                  </MobileLink>
                </React.Fragment>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  )
}
