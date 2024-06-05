'use server'

import {api} from '@/lib/api'
import {revalidatePath} from 'next/cache'

export const uploadAvatar = async (formData: FormData, user_id: string) => {
  await api.post(`user/${user_id}/avatar`, {
    body: formData
  })
  revalidatePath('/profil/edit')
}
