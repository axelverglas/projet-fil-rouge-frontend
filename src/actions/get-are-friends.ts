import {get} from '@/lib/api'
import {Friends} from '@/types'

export const getAreFriends = async (
  creatorId: string,
  receiverId: string
): Promise<Friends> => {
  const response = await get<Friends>(`friendships/are-friends`, {
    creatorId,
    receiverId
  })
  return response
}
