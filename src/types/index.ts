export interface User {
  _id: string
  username: string
  email: string
  avatar_url: string
  created_at: string
  updated_at: string
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
  board: string[][]
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

export interface Friends {
  _id: string
  creator_id: string
  receiver_id: string
  status: string
  user?: User
}

export interface FriendshipRequest {
  request: Friends
  user: User
}

export interface Message {
  _id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
  conversation_id: string
}

export interface Conversation {
  _id: string
  user1_id: string
  user2_id: string
  messages: Message[]
}

export interface Friend {
  _id: string
  user: User
  status: string
}

export interface Notification {
  _id: string
  user_id: string
  sender_id: string
  content: string
  notif_type: string
  createdAt: string
  read: boolean
}
