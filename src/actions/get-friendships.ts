import {get} from '@/lib/api'
import {Friends, FriendshipRequest} from '@/types'

export const getFriends = async (userId: string): Promise<Friends[]> => {
  const response = await get<Friends[]>(`friendships/${userId}/friends`)
  return response
}

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
