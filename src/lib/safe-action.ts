import getCurrentUser from '@/actions/get-current-user'
import {createSafeActionClient} from 'next-safe-action'

class ActionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ActionError'
  }
}

const handleReturnedServerError = (error: Error) => {
  if (error instanceof ActionError) {
    return error.message
  }
  return 'An unexpected error occurred'
}

export const action = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError
})

export const userAction = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError,
  middleware: async () => {
    const user = await getCurrentUser()

    if (!user) {
      throw new ActionError('You must be logged in')
    }

    return {user}
  }
})
