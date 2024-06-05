'use server'

import {userAction} from '@/lib/safe-action'
import {z} from 'zod'
import {post} from '@/lib/api'

const AddFriendsSchema = z.object({
  receiverId: z.string(),
  creatorId: z.string()
})

export const addFriends = userAction(AddFriendsSchema, async (input) => {
  const {receiverId, creatorId} = input

  await post('friendships/send-request', {
    creatorId,
    receiverId
  })
})
