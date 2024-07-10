import {z} from 'zod'

export const MarkNotificationAsReadSchema = z.object({
  notifId: z.string()
})

export type MarkNotificationAsReadType = z.infer<
  typeof MarkNotificationAsReadSchema
>

export const DeleteNotificationSchema = z.object({
  userId: z.string()
})

export type DeleteNotificationType = z.infer<typeof DeleteNotificationSchema>
