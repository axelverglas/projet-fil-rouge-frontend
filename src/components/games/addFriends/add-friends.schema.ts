import {z} from 'zod'

export const AddFriendsSchema = z.object({
  receiverId: z.string(),
  creatorId: z.string()
})

export type AddFriendsType = z.infer<typeof AddFriendsSchema>
