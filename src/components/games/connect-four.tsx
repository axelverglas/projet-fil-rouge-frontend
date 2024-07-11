'use client'

import {useEffect} from 'react'
import socket from '@/lib/socket'
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query'
import {Game, User} from '@/types'
import {useGame} from '@/hooks/use-game'
import {put} from '@/lib/api'
import toast from 'react-hot-toast'
import {Button} from '../ui/button'
import {FacebookIcon, TwitterIcon} from 'lucide-react'
import {shareOnFacebook, shareOnTwitter} from '@/lib/share'

interface ConnectFourProps {
  user: User | null
  id: string
}

export default function ConnectFour({user, id}: ConnectFourProps) {
  const queryClient = useQueryClient()
  const {
    data: game,
    error,
    isLoading: isGameLoading
  } = useQuery(useGame({gameId: id, gameType: 'connectfour'}))

  const pauseGameMutation = useMutation({
    mutationFn: async () => {
      await put(`games/${game?.game_type}/${game?._id}/pause`, {})
    },
    onSuccess: () => {
      toast.success('Game paused')
      queryClient.invalidateQueries({
        queryKey: ['games', 'connectfour', game?._id]
      })
    },
    onError: () => {
      toast.error('Failed to pause game')
    }
  })

  const finishGameMutation = useMutation({
    mutationFn: async () => {
      await put(`games/${game?.game_type}/${game?._id}/finish`, {})
    },
    onSuccess: () => {
      toast.success('Game finished')
      queryClient.invalidateQueries({
        queryKey: ['games', 'connectfour', game?._id]
      })
    },
    onError: () => {
      toast.error('Failed to finish game')
    }
  })

  useEffect(() => {
    if (game?._id && user?._id) {
      console.log('Joining game:', {user_id: user._id, game_id: game._id})
      socket.emit('join_game', {
        user_id: user._id,
        game_id: game._id,
        game_type: game.game_type
      })

      socket.on('game_start', (data: {game_id: string}) => {
        console.log('Le jeu a commencé :', data)
        queryClient.invalidateQueries({
          queryKey: ['games', 'connectfour', game._id]
        })
      })

      socket.on('game_update', (updatedGame: Game) => {
        console.log('Jeu mis à jour :', updatedGame)
        queryClient.setQueryData(
          ['games', 'connectfour', game._id],
          updatedGame
        )
      })

      return () => {
        socket.off('game_start')
        socket.off('game_update')
      }
    }
  }, [game, user?._id, queryClient])

  if (error) return <div>Échec du chargement</div>

  if (!user || isGameLoading) {
    return <div>Chargement...</div>
  }

  const makeMove = (column: number) => {
    if (game && (game.state === 'finished' || game.current_turn !== user?._id))
      return

    socket.emit('make_move', {
      game_id: game?._id,
      move: column,
      player_id: user?._id,
      game_type: game?.game_type
    })
  }

  const shareMessage =
    game?.winner === user?._id
      ? "J'ai gagné à ce jeu incroyable !"
      : "J'ai perdu, mais c'était un jeu incroyable !"

  return (
    <div className="flex gap-4">
      <div className="grid max-w-3xl grid-cols-7 gap-1">
        {game?.board.flatMap((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => makeMove(colIndex)}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-300 text-2xl font-bold"
              disabled={game.state === 'finished'}
            >
              {cell}
            </button>
          ))
        )}
      </div>
      <div>
        {game?.state === 'finished' && game.winner && (
          <div>
            <h2 className="text-2xl font-bold">Partie terminée !</h2>
            <p className="text-lg">
              {game?.winner === user?._id
                ? 'Félicitations ! Vous avez gagné !'
                : 'Vous avez perdu. Bonne chance la prochaine fois !'}
            </p>
            <div className="flex flex-col gap-2">
              <p>Partager sur :</p>
              <div className="flex gap-2">
                <Button onClick={() => shareOnFacebook(shareMessage)}>
                  <FacebookIcon />
                </Button>
                <Button onClick={() => shareOnTwitter(shareMessage)}>
                  <TwitterIcon />
                </Button>
              </div>
            </div>
          </div>
        )}
        <p className="text-lg">
          Tour actuel :{' '}
          <span className="font-semibold">
            {game?.current_turn === user?._id
              ? 'Votre tour'
              : "Tour de l'adversaire"}
          </span>
        </p>
        <p className="text-lg">
          Statut : <span className="font-semibold">{game?.state}</span>
        </p>
        {game?.winner && (
          <p className="text-lg">
            Gagnant :{' '}
            <span className="font-semibold">
              {game.winner === user?._id ? 'Vous' : 'Adversaire'}
            </span>
          </p>
        )}
        {game?.state !== 'finished' && (
          <div className="flex gap-2">
            <Button onClick={() => pauseGameMutation.mutate()}>Pause</Button>
            <Button
              variant="destructive"
              onClick={() => finishGameMutation.mutate()}
            >
              Terminer
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
