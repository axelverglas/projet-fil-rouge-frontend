import getCurrentUser from '@/actions/get-current-user'
import {getUserByName} from '@/actions/get-user'
import Section from '@/components/layout/section'
import {notFound} from 'next/navigation'
import Image from 'next/image'
import {getFriends} from '@/actions/get-friendships'
import {formatDate} from '@/lib/format-date'

export default async function Page({params}: {params: {username: string}}) {
  const currentUser = await getCurrentUser()
  const user = await getUserByName(params.username)
  if (!user) return notFound()
  const friends = await getFriends(user._id)
  return (
    <>
      <Section>
        <div className="container flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Profil</h2>
          <div className="flex items-center gap-4">
            {user?.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt={user.username}
                className="aspect-square h-32 w-32 rounded-full"
                width={60}
                height={60}
              />
            ) : (
              <Image
                src="/img/placeholder.jpeg"
                alt="Avatar"
                className="aspect-square h-32 w-32 rounded-full"
                width={32}
                height={32}
              />
            )}
            <div>
              <h3 className="text-xl font-bold">{user.username}</h3>
              <p className="font-medium">{user.email}</p>
              <p>Membre depuis le {formatDate(user.created_at)}</p>
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <div className="container flex flex-col gap-4">
          <h2 className="text-3xl font-bold">
            {currentUser ? "T'es" : 'Ses'} amis
          </h2>
          {friends.length === 0 ? (
            <p>
              {currentUser ? 'Tu' : `${user.username}`} n&apos;as pas encore
              d&apos;ami !
            </p>
          ) : (
            <div className="grid grid-cols-6 gap-2">
              {friends.map((friend) => (
                <div
                  className="flex flex-col items-center gap-2"
                  key={friend._id}
                >
                  <div className="relative">
                    {friend.user?.avatar_url ? (
                      <Image
                        src={friend.user.avatar_url}
                        alt={friend.user.username}
                        className="aspect-square h-32 w-32 rounded-full"
                        width={60}
                        height={60}
                      />
                    ) : (
                      <Image
                        src="/img/placeholder.jpeg"
                        alt="Avatar"
                        className="aspect-square h-32 w-32 rounded-full"
                        width={32}
                        height={32}
                      />
                    )}
                  </div>
                  <h3 className="font-bold">{friend.user?.username}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
