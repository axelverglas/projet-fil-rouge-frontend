import getCurrentUser from '@/actions/get-current-user'
import Games from '@/components/games/games'
import Section from '@/components/layout/section'

export default async function Page() {
  const user = await getCurrentUser()
  return (
    <Section>
      <div className="container">
        <Games user={user} />
      </div>
    </Section>
  )
}
