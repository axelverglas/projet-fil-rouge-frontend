'use client'
import {useEffect, useState} from 'react'
import socket from '@/lib/socket'
import {useRouter} from 'next/navigation'
import {QueueResponse, User} from '../../types'
import {post} from '@/lib/api'
import toast from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '../../components/ui/dialog'
import Image from 'next/image'

export default function Games({user}: {user: User | null}) {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)
  const [currentGameType, setCurrentGameType] = useState<string | null>(null)

  useEffect(() => {
    const handleGameReady = (data: {
      game_id: string
      user_id_1: string
      user_id_2: string
      game_type: string
    }) => {
      if (
        data.user_id_1 === String(user?._id) ||
        data.user_id_2 === String(user?._id)
      ) {
        router.push(`/games/${data.game_type}/${data.game_id}`)
      }
    }

    socket.on('game_ready', handleGameReady)

    return () => {
      socket.off('game_ready', handleGameReady)
    }
  }, [user, router, currentGameType])

  const handlePlay = async (gameType: string) => {
    if (!user) {
      toast.error('Vous devez être connecté pour jouer.')
      router.push('/auth/login')
      return
    }

    setCurrentGameType(gameType)
    try {
      const data = await post<QueueResponse>('games/queue', {
        user_id: user?._id,
        game_type: gameType
      })

      if (data.game_id) {
        router.push(`/games/${gameType}/${data.game_id}`)
      } else {
        setIsSearching(true)
        toast.success("En attente d'un adversaire...")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleCloseDialog = () => {
    setIsSearching(false)
    setCurrentGameType(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Les jeux</h2>
      <div className="flex gap-4">
        <div
          onClick={() => handlePlay('tictactoe')}
          className="relative h-[100px] w-[200px] cursor-pointer overflow-hidden rounded-md"
        >
          <Image
            src={'/img/morpion.avif'}
            alt="Morpion"
            width={200}
            height={100}
            className="rounded-md"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
            <p className="text-xl font-bold text-white">Morpion</p>
          </div>
        </div>
        <div
          onClick={() => handlePlay('connectfour')}
          className="relative h-[100px] w-[200px] cursor-pointer overflow-hidden rounded-md"
        >
          <Image
            src={'/img/connectfour.avif'}
            alt="Connect Four"
            width={200}
            height={100}
            className="rounded-md"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
            <p className="text-xl font-bold text-white">Puissance 4</p>
          </div>
        </div>
      </div>
      <Dialog open={isSearching} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recherche d&apos;un adversaire...</DialogTitle>
            <DialogDescription>
              Merci de patienter nous recherchons un adversaire pour vous.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
