'use client'
import {useEffect, useState} from 'react'
import socket from '@/lib/socket'
import {useGame} from '@/hooks/use-game'
import {useQueryClient} from 'react-query'
import {Game, User} from '@/types'
import {useParams} from 'next/navigation'
import {Skeleton} from '@/components/ui/skeleton'

export default function TicTacToe({user}: {user: User | null}) {
  const params = useParams<{gameId: string}>()
  const gameId = params.gameId
  const {data: game, error} = useGame(gameId)
  const queryClient = useQueryClient()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (gameId !== 'None') {
      socket.emit('join_game', {user_id: user?._id, game_id: gameId})

      socket.on(
        'game_start',
        (data: {game_id: string; opponent_id: string}) => {
          console.log('Game started:', data)
          queryClient.invalidateQueries(['game', gameId])
        }
      )

      socket.on('game_update', (updatedGame: Game) => {
        console.log('Game updated:', updatedGame)
        queryClient.setQueryData(['game', gameId], updatedGame)
      })

      return () => {
        socket.off('game_start')
        socket.off('game_update')
      }
    }
  }, [gameId, user?._id, queryClient])

  useEffect(() => {
    if (!game) {
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(interval)
            return 100
          }
          return oldProgress + 10
        })
      }, 500)
      return () => {
        clearInterval(interval)
      }
    }
  }, [game])

  const makeMove = (index: number) => {
    console.log('Attempting to make a move:', index)
    if (
      game &&
      (game.board[index] !== '' ||
        game.current_turn !== user?._id ||
        game.state === 'finished')
    )
      return

    socket.emit('make_move', {
      game_id: gameId,
      move: index,
      player_id: user?._id
    })
  }

  if (error)
    return <div className="text-center text-red-500">Failed to fetch game</div>

  if (!game)
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-semibold">Chargement du jeu</p>
      </div>
    )

  if (game.state === 'waiting')
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-semibold">Waiting for an opponent...</p>
      </div>
    )

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="grid grid-cols-3 gap-2">
        {game.board.map((cell, index) => (
          <button
            key={index}
            onClick={() => makeMove(index)}
            className="flex h-24 w-24 items-center justify-center border border-gray-300 text-3xl font-bold"
            disabled={cell !== '' || game.state === 'finished'}
          >
            {cell}
          </button>
        ))}
      </div>
      {game.state === 'finished' && game.winner && (
        <div className="mt-5 text-center">
          <h2 className="text-2xl font-bold">Game Over!</h2>
          <p className="text-lg">
            {game.winner === user?._id
              ? 'Congratulations! You won!'
              : 'You lost. Better luck next time!'}
          </p>
        </div>
      )}
      <div className="mt-3 text-lg">
        Current Turn:{' '}
        <span className="font-semibold">
          {game.current_turn === user?._id ? 'Your turn' : "Opponent's turn"}
        </span>
      </div>
      <div className="mt-1 text-lg">
        Status: <span className="font-semibold">{game.state}</span>
      </div>
      {game.winner && (
        <div className="mt-1 text-lg">
          Winner:{' '}
          <span className="font-semibold">
            {game.winner === user?._id ? 'You' : 'Opponent'}
          </span>
        </div>
      )}
    </div>
  )
}
