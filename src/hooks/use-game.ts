import {useQuery} from 'react-query'
import {Game} from '@/types'
import {getGame} from '@/actions/get-game'

export const useGame = (gameId: string) => {
  return useQuery<Game>({
    queryKey: ['game', gameId],
    queryFn: () => getGame(gameId)
  })
}
