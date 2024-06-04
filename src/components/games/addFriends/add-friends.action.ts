'use server'

import {userAction} from '@/lib/safe-action'
import {post} from '@/lib/api'
import {AddFriendsSchema} from './add-friends.schema'

export const addFriends = userAction(AddFriendsSchema, async (input) => {
  const {receiverId, creatorId} = input

  await post('friendships/send-request', {
    creatorId,
    receiverId
  })
})
