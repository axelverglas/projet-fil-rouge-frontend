'use client'
import Section from '@/components/layout/section'
import {Button} from '@/components/ui/button'
import {FriendshipRequest, User} from '@/types'
import {AcceptFriendRequestType} from '../friend.schema'
import {AcceptFriendRequest} from '../friends.action'
import toast from 'react-hot-toast'
import {useMutation} from '@tanstack/react-query'

interface FriendsRequestsProps {
  sentRequests: FriendshipRequest[]
  receivedRequests: FriendshipRequest[]
  user: User
}

export default function FriendsRequests({
  sentRequests,
  receivedRequests,
  user
}: FriendsRequestsProps) {
  const acceptFriendRequest = useMutation({
    mutationFn: async (values: AcceptFriendRequestType) => {
      const {serverError} = await AcceptFriendRequest(values)
      if (serverError) {
        toast.error(serverError)
        return
      }

      toast.success('Friend request accepted!')
    }
  })
  return (
    <Section>
      <div className="container flex flex-col">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold">T&apos;es demandes envoyées</h3>
            {sentRequests.length === 0 ? (
              <p>Tu n&apos;as pas envoyé de demande d&apos;ami !</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="border-b p-2">Utilisateur</th>
                    <th className="border-b p-2">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {sentRequests.map((request, index) => (
                    <tr key={index}>
                      <td className="border-b p-2">{request.user.username}</td>
                      <td className="border-b p-2">{request.request.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold">T&apos;es demandes reçues</h3>
            {receivedRequests.length === 0 ? (
              <p>Tu n&apos;as pas reçu de demande d&apos;ami !</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="border-b p-2">Utilisateur</th>
                    <th className="border-b p-2">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {receivedRequests.map((request, index) => (
                    <tr key={index}>
                      <td className="border-b p-2">{request.user.username}</td>
                      <td className="border-b p-2">
                        <div className="flex gap-2">
                          <Button
                            onClick={async () => {
                              await acceptFriendRequest.mutateAsync({
                                creatorId: request.user._id,
                                receiverId: user._id
                              })
                            }}
                            size="sm"
                          >
                            Accepter
                          </Button>
                          <Button size="sm" variant="destructive">
                            Refuser
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
