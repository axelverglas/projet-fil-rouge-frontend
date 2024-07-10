import {getNotifications} from '@/actions/get-notifcation'

export const useNotifications = ({userId}: {userId: string}) => {
  const queryKey = ['notifications', userId]

  const queryFn = async () => {
    return getNotifications(userId)
  }

  return {queryFn, queryKey}
}
