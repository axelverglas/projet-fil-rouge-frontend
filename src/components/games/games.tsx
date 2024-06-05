'use client'
import {useEffect, useState} from 'react'
import socket from '@/lib/socket'
import {useRouter} from 'next/navigation'
import {QueueResponse, User} from '../../types'
import {post} from '@/lib/api'
import toast from 'react-hot-toast'

export default function Games({user}: {user: User | null}) {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    socket.on(
      'game_ready',
      (data: {game_id: string; user_id_1: string; user_id_2: string}) => {
        if (
          data.user_id_1 === String(user?._id) ||
          data.user_id_2 === String(user?._id)
        ) {
          router.push(`/games/tictactoe/${data.game_id}`)
        }
      }
    )

    return () => {
      socket.off('game_ready')
    }
  }, [user, router])

  const handlePlay = async () => {
    try {
      const data = await post<QueueResponse>('games/queue', {
        user_id: user?._id,
        game_type: 'tictactoe'
      })

      if (data.game_id) {
        router.push(`/games/tictactoe/${data.game_id}`)
      } else {
        setIsSearching(true)
        toast.success("En attente d'un adversaire...")
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <button onClick={handlePlay}>Play Tic Tac Toe</button>
      {isSearching && <p>Searching for an opponent...</p>}
    </div>
  )
}
