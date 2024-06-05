'use server'

import {userAction} from '@/lib/safe-action'
import {post, del} from '@/lib/api'
import {AcceptFriendRequestSchema, deleteFriendSchema} from './friend.schema'
import {revalidatePath} from 'next/cache'

export const AcceptFriendRequest = userAction(
  AcceptFriendRequestSchema,
  async (input) => {
    await post('friendships/accept-request', {
      creatorId: input.creatorId,
      receiverId: input.receiverId
    })
    revalidatePath('/profil/friends')
  }
)

export const deleteFriend = userAction(deleteFriendSchema, async (input) => {
  await del('friendships/delete-friend', {
    creatorId: input.creatorId,
    receiverId: input.receiverId
  })
  revalidatePath('/profil/friends')
})
