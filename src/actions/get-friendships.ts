import {get} from '@/lib/api'
import {FriendshipRequest} from '@/types'

export const getSentRequests = async (
  userId: string
): Promise<FriendshipRequest[]> => {
  const response = await get<FriendshipRequest[]>(
    `friendships/${userId}/sent-requests`
  )
  return response
}

export const getReceivedRequests = async (
  userId: string
): Promise<FriendshipRequest[]> => {
  const response = await get<FriendshipRequest[]>(
    `friendships/${userId}/received-requests`
  )
  return response
}
