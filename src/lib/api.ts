'use server'

import getSession from '@/actions/get-session'
import ky from 'ky'

const api = ky.extend({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const session = await getSession()
        request.headers.set('Authorization', `Bearer ${session?.access_token}`)
      }
    ]
  }
})

export async function get<T>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
  return api.get(path, {searchParams: params}).json()
}

export async function post<T>(
  path: string,
  body: Record<string, unknown>
): Promise<T> {
  return api.post(path, {json: body}).json()
}

export async function put<T>(
  path: string,
  body: Record<string, unknown>
): Promise<T> {
  return api.put(path, {json: body}).json()
}

export async function del<T>(path: string): Promise<T> {
  return api.delete(path).json()
}
