import {User} from '@/types'
import getSession from './get-session'

export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${session.user._id}`,
      {
        method: 'GET'
      }
    )
    const currentUser = await response.json()

    if (!currentUser) {
      return null
    }

    return currentUser as User
  } catch (error: any) {
    return null
  }
}
