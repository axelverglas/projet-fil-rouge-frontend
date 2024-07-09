import {get} from '@/lib/api'
import {Game, User} from '@/types'

export const getGame = async (
  gameId: string,
  gameType: string
): Promise<Game> => {
  const response = await get<Game>(`games/${gameType}/${gameId}`)
  return response
}

export const getOpponent = async (
  userId: string,
  gameId: string,
  gameType: string
): Promise<User> => {
  const response = await get<User>(`games/${gameType}/${gameId}/opponent`, {
    user_id: userId
  })
  return response
}
