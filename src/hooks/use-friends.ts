import {useQuery} from '@tanstack/react-query'
import {getFriends} from '@/actions/get-friendships'
import {Friend} from '@/types'

export const useFriends = (userId: string) => {
  const queryKey = ['friends', userId]

  const queryFn = async () => {
    return getFriends(userId)
  }

  return useQuery<Friend[], Error>({queryKey, queryFn})
}
