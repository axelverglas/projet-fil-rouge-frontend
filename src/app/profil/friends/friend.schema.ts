import {z} from 'zod'

export const AcceptFriendRequestSchema = z.object({
  creatorId: z.string(),
  receiverId: z.string()
})

export type AcceptFriendRequestType = z.infer<typeof AcceptFriendRequestSchema>

export const deleteFriendSchema = z.object({
  creatorId: z.string(),
  receiverId: z.string()
})

export type DeleteFriendType = z.infer<typeof deleteFriendSchema>
