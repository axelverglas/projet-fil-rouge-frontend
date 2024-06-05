import {get} from '@/lib/api'
import {Game, User} from '@/types'

export const getGame = async (gameId: string): Promise<Game> => {
  const response = await get<Game>(`games/tictactoe/${gameId}`)
  return response
}

export const getOpponent = async (
  user_id: string,
  gameId: string
): Promise<User> => {
  const response = await get<User>(`games/${gameId}/opponent`, {
    user_id: user_id
  })
  return response
}
