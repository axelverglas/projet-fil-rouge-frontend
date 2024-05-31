import getCurrentUser from '@/actions/get-current-user'
import Section from '@/components/layout/section'
import TicTacToe from '@/components/tictactoe'

export default async function Page() {
  const user = await getCurrentUser()
  return (
    <Section>
      <div className="container">
        <h1 className="text-center text-3xl font-bold">Jeu du Morpion</h1>
        <TicTacToe user={user} />
      </div>
    </Section>
  )
}
