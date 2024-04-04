import LoginForm from '@/components/auth/login-form'
import getSession from '@/actions/get-session'
import {redirect} from 'next/navigation'

export default async function AuthenticationPage() {
  const session = await getSession()
  if (session) {
    redirect('/')
  }
  return (
    <div className="w-full">
      <div className="mx-auto flex h-[calc(100vh-(4rem+6rem))] max-w-md flex-col items-center justify-center px-8 py-12">
        <div className="flex w-full flex-col gap-6">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
