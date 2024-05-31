export interface User {
  _id: string
  username: string
  email: string
  avatar_url: string
  createdAt: string
  updatedAt: string
}

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export interface Game {
  _id: string
  player1_id: string
  player2_id: string
  board: string[]
  current_turn: string
  state: string
  game_type: string
  winner?: string
}

export interface QueueResponse {
  game_id?: string
  opponent_id?: string
  message?: string
}
