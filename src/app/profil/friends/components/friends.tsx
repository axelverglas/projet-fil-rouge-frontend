'use client'
import {Button} from '@/components/ui/button'
import Section from '@/components/layout/section'
import Image from 'next/image'
import {Trash} from 'lucide-react'
import {deleteFriend} from '../friends.action'
import {Friends as FriendsType} from '@/types'
import toast from 'react-hot-toast'
import {DeleteFriendType} from '../friend.schema'
import {useMutation} from '@tanstack/react-query'

export default function Friends({friends}: {friends: FriendsType[]}) {
  const deleteFriendMutation = useMutation({
    mutationFn: async (values: DeleteFriendType) => {
      const {serverError} = await deleteFriend(values)
      if (serverError) {
        toast.error(serverError)
        return
      }

      toast.success('Friend deleted!')
    }
  })
  return (
    <Section>
      <div className="container flex flex-col gap-4">
        <h2 className="text-3xl font-bold">T&apos;es amis</h2>
        {friends.length === 0 ? (
          <p>Tu n&apos;as pas encore d&apos;ami !</p>
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
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await deleteFriendMutation.mutateAsync({
                        creatorId: friend.creator_id,
                        receiverId: friend.receiver_id
                      })
                    }}
                    className="absolute -right-2 top-0 cursor-pointer rounded-full p-2 opacity-90 hover:opacity-100"
                  >
                    <Trash className="h-5 w-6" />
                  </Button>
                </div>
                <h3 className="font-bold">{friend.user?.username}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
