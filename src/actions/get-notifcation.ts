// actions/notifications.ts
import {get, put} from '@/lib/api'
import {Notification} from '@/types'

export const getNotifications = async (
  userId: string
): Promise<Notification[]> => {
  return await get<Notification[]>(`notifications/${userId}`)
}
