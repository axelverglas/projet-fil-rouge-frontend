import {get} from '@/lib/api'
import {User} from '@/types'

export const getUserById = async (userId: string): Promise<User> => {
  const response = await get<User>(`user/${userId}`)
  return response
}
