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

interface TicTacToeProps {
  user: User | null
  id: string
}

export default function TicTacToe({user, id}: TicTacToeProps) {
  const queryClient = useQueryClient()
  const {
    data: game,
    error,
    isLoading: isGameLoading
  } = useQuery(useGame({gameId: id, gameType: 'tictactoe'}))

  const pauseGameMutation = useMutation({
    mutationFn: async () => {
      await put(`games/${game?.game_type}/${game?._id}/pause`, {})
    },
    onSuccess: () => {
      toast.success('Game paused')
      queryClient.invalidateQueries({
        queryKey: ['games', 'tictactoe', game?._id]
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
        queryKey: ['games', 'tictactoe', game?._id]
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
          queryKey: ['games', 'tictactoe', game._id]
        })
      })

      socket.on('game_update', (updatedGame: Game) => {
        console.log('Jeu mis à jour :', updatedGame)
        queryClient.setQueryData(['games', 'tictactoe', game._id], updatedGame)
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

  const makeMove = (index: number) => {
    if (
      game &&
      game.board[index].length === 0 &&
      game.current_turn === user?._id &&
      game.state !== 'finished'
    ) {
      socket.emit('make_move', {
        game_id: game?._id,
        move: index,
        player_id: user?._id,
        game_type: game?.game_type
      })
    }
  }

  const shareMessage =
    game?.winner === user?._id
      ? "J'ai gagné à ce jeu incroyable !"
      : "J'ai perdu, mais c'était un jeu incroyable !"

  return (
    <div className="flex gap-4">
      <div className="grid max-w-3xl grid-cols-3 gap-1">
        {game?.board.map((cell, index) => (
          <button
            key={index}
            onClick={() => makeMove(index)}
            className="flex h-28 w-28 items-center justify-center rounded-xl border border-gray-300 text-4xl font-bold sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40"
            disabled={cell.length !== 0 || game.state === 'finished'}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
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
