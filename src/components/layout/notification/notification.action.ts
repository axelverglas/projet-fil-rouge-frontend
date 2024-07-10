'use server'

import {userAction} from '@/lib/safe-action'
import {del, put} from '@/lib/api'
import {
  DeleteNotificationSchema,
  MarkNotificationAsReadSchema
} from './notification.schema'
import {revalidatePath} from 'next/cache'

export const MarkNotificationAsRead = userAction(
  MarkNotificationAsReadSchema,
  async (input) => {
    await put(`notifications/${input.notifId}`, {})
    revalidatePath('/')
  }
)

export const handleDeleteNotification = userAction(
  DeleteNotificationSchema,
  async (input) => {
    await del(`notifications/clear/${input.userId}`, {})
    revalidatePath('/')
  }
)
