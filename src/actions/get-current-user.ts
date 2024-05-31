import {User} from '@/types'
import getSession from './get-session'
import {get} from '@/lib/api'

export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await get<User>(`user/${session.user._id}`)

    if (!currentUser) {
      return null
    }

    return currentUser
  } catch (error: any) {
    return null
  }
}
