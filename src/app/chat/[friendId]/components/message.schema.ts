import {z} from 'zod'

export const SendMessageSchema = z.object({
  sender_id: z.string(),
  receiver_id: z.string(),
  content: z.string().min(1, 'Message content cannot be empty'),
  conversation_id: z.string()
})

export type SendMessageType = z.infer<typeof SendMessageSchema>
