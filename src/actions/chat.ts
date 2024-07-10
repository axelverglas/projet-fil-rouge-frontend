import {get, post} from '@/lib/api'
import {Conversation, Message} from '@/types'

export const getConversation = async (
  user1Id: string,
  user2Id: string
): Promise<Conversation> => {
  const response = await get<Conversation>(`chat/${user1Id}/${user2Id}`)
  return response
}

export const sendMessage = async (
  message: Partial<Message>
): Promise<Message> => {
  const response = await post<Message>('chat/messages', message)
  return response
}
