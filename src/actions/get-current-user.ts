'use server'
import {User} from '@/types'
import getSession from './get-session'

export const currentUser = async () => {
  const session = await getSession()

  if (!session?.user) {
    return null
  }

  const currentUser = session.user as User

  return currentUser
}

export const requiredCurrentUser = async () => {
  const user = await currentUser()

  if (!user) {
    throw new Error('User not found')
  }

  return user
}
