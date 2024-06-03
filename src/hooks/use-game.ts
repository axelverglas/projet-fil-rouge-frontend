import {getGame} from '@/actions/get-game'

export const useGame = ({gameId}: {gameId: string}) => {
  const queryKey = ['games', gameId]

  const queryFn = async () => {
    return getGame(gameId)
  }
  return {queryFn, queryKey}
}
