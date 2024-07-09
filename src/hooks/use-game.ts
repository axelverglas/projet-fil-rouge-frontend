import {getGame} from '@/actions/get-game'

export const useGame = ({
  gameId,
  gameType
}: {
  gameId: string
  gameType: string
}) => {
  const queryKey = ['games', gameType, gameId]

  const queryFn = async () => {
    return getGame(gameId, gameType)
  }

  return {queryFn, queryKey}
}
