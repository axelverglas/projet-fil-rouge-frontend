import Section from '@/components/layout/section'
import getCurrentUser from '@/actions/get-current-user'
import {getSentRequests, getReceivedRequests} from '@/actions/get-friendships'
import {Button} from '@/components/ui/button'

export default async function Page() {
  const user = await getCurrentUser()
  if (!user) return null
  const sentRequests = await getSentRequests(user._id)
  const receivedRequests = await getReceivedRequests(user._id)

  return (
    <Section>
      <div className="container flex flex-col gap-8">
        <h2 className="text-3xl font-bold">Amis</h2>

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
                          <Button size="sm">Accepter</Button>
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
