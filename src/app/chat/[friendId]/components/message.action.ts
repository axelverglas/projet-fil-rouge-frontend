'use server'

import {userAction} from '@/lib/safe-action'
import {post} from '@/lib/api'
import {SendMessageSchema} from './message.schema'
import {revalidatePath} from 'next/cache'

export const sendMessageAction = userAction(
  SendMessageSchema,
  async (input) => {
    await post('chat/messages', {
      sender_id: input.sender_id,
      receiver_id: input.receiver_id,
      content: input.content,
      conversation_id: input.conversation_id
    })
    revalidatePath(`chat/${input.conversation_id}`)
  }
)
