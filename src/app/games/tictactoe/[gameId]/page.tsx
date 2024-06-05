import getCurrentUser from '@/actions/get-current-user'
import {getOpponent} from '@/actions/get-game'
import AddFriends from '@/components/games/addFriends/add-friends'
import Section from '@/components/layout/section'
import TicTacToe from '@/components/games/tictactoe'
import {useGame} from '@/hooks/use-game'
import {HydrationBoundary, QueryClient, dehydrate} from '@tanstack/react-query'

export default async function Page({params}: {params: {gameId: string}}) {
  const user = await getCurrentUser()
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(useGame({gameId: params.gameId}))
  if (!user) return null
  const opponent = await getOpponent(user._id, params.gameId)
  return (
    <Section>
      <div className="container flex flex-col gap-12">
        <h1 className="text-center text-3xl font-bold">Jeu du Morpion</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <TicTacToe user={user} id={params.gameId} />
            </HydrationBoundary>
          </div>
          <div className="md:col-span-1">
            <AddFriends opponent={opponent} userId={user._id} />
          </div>
        </div>
      </div>
    </Section>
  )
}
