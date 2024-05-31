import {get} from '@/lib/api'
import {Game} from '@/types'

export const getGame = async (gameId: string): Promise<Game> => {
  const response = await get<Game>(`games/tictactoe/${gameId}`)
  return response
}
