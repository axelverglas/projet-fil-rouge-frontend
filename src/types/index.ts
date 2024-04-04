export interface User {
  id: number
  username: string
  email: string
}

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}
