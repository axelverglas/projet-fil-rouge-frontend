import getCurrentUser from '@/actions/get-current-user'
import AvatarUpload from './components/avatar-upload'
import Section from '@/components/layout/section'
import Image from 'next/image'

export default async function ProfilPage() {
  const user = await getCurrentUser()
  if (!user) return null

  return (
    <Section>
      <div className="container flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Profil</h2>
        <AvatarUpload user={user} />
      </div>
    </Section>
  )
}
