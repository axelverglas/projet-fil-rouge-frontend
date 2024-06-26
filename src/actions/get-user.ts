import {get} from '@/lib/api'
import {User} from '@/types'

export const getUserById = async (userId: string): Promise<User> => {
  const response = await get<User>(`user/${userId}`)
  return response
}

export const getUserByName = async (username: string): Promise<User | null> => {
  try {
    const response = await get<User>(`user/username/${username}`)
    return response
  } catch (error) {
    return null
  }
}
