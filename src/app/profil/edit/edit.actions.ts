'use server'

import {userAction} from '@/lib/safe-action'
import {api} from '@/lib/api'
import {uploadAvatarSchema} from './edit.schema'
import {revalidatePath} from 'next/cache'

export const uploadAvatar = async (formData: FormData, user_id: string) => {
  await api.post(`user/${user_id}/avatar`, {
    body: formData
  })
  revalidatePath('/profil/edit')
}
