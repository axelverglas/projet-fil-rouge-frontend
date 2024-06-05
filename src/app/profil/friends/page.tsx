import getCurrentUser from '@/actions/get-current-user'
import {
  getSentRequests,
  getReceivedRequests,
  getFriends
} from '@/actions/get-friendships'
import FriendsRequests from './components/friends-requests'
import Friends from './components/friends'
import {getSession} from 'next-auth/react'

export default async function Page() {
  const user = await getCurrentUser()
  if (!user) return null
  const friends = await getFriends(user._id)
  const sentRequests = await getSentRequests(user._id)
  const receivedRequests = await getReceivedRequests(user._id)

  return (
    <>
      <Friends friends={friends} />
      <FriendsRequests
        sentRequests={sentRequests}
        receivedRequests={receivedRequests}
        user={user}
      />
    </>
  )
}
