import AdvantagesBanner from '@/components/advantage'
import getCurrentUser from '@/actions/get-current-user'
import Section from '@/components/layout/section'
import Games from '@/components/games/games'
import {Button, buttonVariants} from '@/components/ui/button'
import Link from 'next/link'
import {cn} from '@/lib/utils'
import {siteConfig} from '@/config/site'

export default async function Page() {
  const user = await getCurrentUser()
  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-20">
        <div className="container flex flex-col gap-4">
          <h1 className="text-5xl font-bold text-white">{siteConfig.name}</h1>
          <p className="text-3xl text-gray-200">
            Rejoignez la plateforme de jeux ultime et vivez des expériences
            inoubliables.
          </p>
          <Link
            href="#games"
            className={cn(
              buttonVariants({variant: 'default'}),
              'w-fit bg-white px-6 py-3 font-semibold text-purple-600 transition-colors duration-300 hover:bg-gray-100'
            )}
          >
            Jouer
          </Link>
        </div>
      </div>
      <Section id="games">
        <div className="container">
          <Games user={user} />
        </div>
      </Section>
      <AdvantagesBanner />
    </>
  )
}
