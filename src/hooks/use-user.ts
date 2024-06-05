import {getUserById} from '@/actions/get-user'

export const useGetUserById = ({userId}: {userId: string}) => {
  const queryKey = ['user', userId]

  const queryFn = async () => {
    return getUserById(userId)
  }
  return {queryFn, queryKey}
}
