'use client'
import {addFriends} from '@/actions/add-friends'
import {useAreFriends} from '@/hooks/use-are-friends'
import Image from 'next/image'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {Skeleton} from '../../ui/skeleton'
import {AddFriendsType} from './add-friends.schema'
import {Button} from '@/components/ui/button'
import {User} from '@/types'

interface AddFriendsProps {
  opponent: User
  userId: string
}

export default function AddFriends({opponent, userId}: AddFriendsProps) {
  const queryClient = useQueryClient()
  const {data: areFriends, isLoading: isLoadingAreFriends} = useQuery(
    useAreFriends({creatorId: userId, receiverId: opponent._id})
  )

  const mutation = useMutation({
    mutationFn: async (values: AddFriendsType) => {
      const {serverError} = await addFriends(values)

      if (serverError) {
        toast.error(serverError)
        return
      }

      toast.success('Friend request sent!')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['areFriends', userId, opponent._id]
      })
    }
  })

  if (isLoadingAreFriends) {
    return (
      <div className="mb-4 flex flex-col gap-4 rounded-xl bg-muted p-4">
        <Skeleton className="h-24 w-full rounded" />
      </div>
    )
  }

  if (!opponent) return null

  return (
    <div className="mb-4 flex flex-col gap-4 rounded-xl bg-muted p-4">
      <h2 className="text-lg font-semibold">Adversaires</h2>
      <div className="flex items-center gap-4">
        {opponent.avatar_url ? (
          <Image
            src={opponent.avatar_url}
            alt={opponent.username}
            width={60}
            height={60}
            className="h-14 w-14 rounded-full"
          />
        ) : (
          <Image
            src="/img/placeholder.jpeg"
            alt="Avatar"
            className="h-14 w-14 rounded-full"
            width={32}
            height={32}
          />
        )}
        <p className="font-bold">{opponent.username}</p>
      </div>
      {areFriends?.status === 'accepted' && (
        <p className="font-medium">Déjà ami</p>
      )}
      {areFriends?.status === 'pending' && (
        <p className="font-medium">Demande envoyée</p>
      )}
      {!areFriends ||
        (areFriends.status === null && (
          <Button
            onClick={async () => {
              await mutation.mutateAsync({
                receiverId: opponent._id,
                creatorId: userId
              })
            }}
          >
            Ajouter en ami
          </Button>
        ))}
    </div>
  )
}
