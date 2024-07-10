import {getConversation} from '@/actions/chat'

export const useConversation = ({
  user1Id,
  user2Id
}: {
  user1Id: string
  user2Id: string
}) => {
  const queryKey = ['conversation', user1Id, user2Id]

  const queryFn = async () => {
    return getConversation(user1Id, user2Id)
  }

  return {queryFn, queryKey}
}
