import getCurrentUser from '@/actions/get-current-user'
import {getUserById} from '@/actions/get-user'
import FriendsChat from './components/friend-chat'
import {useConversation} from '@/hooks/use-conversations'
import {dehydrate, HydrationBoundary} from '@tanstack/react-query'
import queryClient from '@/lib/query-client'

export default async function Page({params}: {params: {friendId: string}}) {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null
  const friend = await getUserById(params.friendId)
  if (!friend) return null
  await queryClient.prefetchQuery(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useConversation({user1Id: currentUser._id, user2Id: friend._id})
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FriendsChat user={currentUser} friend={friend} />
    </HydrationBoundary>
  )
}
