import getCurrentUser from '@/actions/get-current-user'
import Test from './test'

export default async function Page() {
  const user = await getCurrentUser()
  return (
    <div>
      <h1>Page</h1>
      <Test user={user} />
    </div>
  )
}
