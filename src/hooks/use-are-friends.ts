import {getAreFriends} from '@/actions/get-are-friends'

export const useAreFriends = ({
  creatorId,
  receiverId
}: {
  creatorId: string
  receiverId: string
}) => {
  const queryKey = ['areFriends', creatorId, receiverId]

  const queryFn = async () => {
    return getAreFriends(creatorId, receiverId)
  }
  return {queryFn, queryKey}
}
