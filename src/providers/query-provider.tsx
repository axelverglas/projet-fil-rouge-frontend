'use client'

import * as React from 'react'
import {Query} from 'react-query'
import {QueryClient, QueryClientProvider} from 'react-query'

interface QueryProviderProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export function QueryProvider({children}: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
