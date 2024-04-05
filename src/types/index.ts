export interface User {
  _id: number
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
