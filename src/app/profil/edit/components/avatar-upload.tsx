'use client'

import {Button} from '@/components/ui/button'
import {User} from '@/types'
import {Import} from 'lucide-react'
import Image from 'next/image'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {UploadAvatarType, uploadAvatarSchema} from '../edit.schema'
import {useRef} from 'react'
import toast from 'react-hot-toast'
import {uploadAvatar} from '../edit.actions'

export default function AvatarUpload({user}: {user: User}) {
  const form = useForm<UploadAvatarType>({
    resolver: zodResolver(uploadAvatarSchema),
    defaultValues: {
      file: new File([], '')
    }
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleUploadAvatar = async (data: UploadAvatarType) => {
    const formData = new FormData()
    if (data.file) {
      formData.append('file', data.file)
      try {
        await uploadAvatar(formData, user._id)
        form.reset()
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        toast.success('Avatar mis à jour')
      } catch (error) {
        toast.error('Une erreur est survenue')
      }
    } else {
      toast.error('Veuillez sélectionner un fichier')
    }
  }

  const handleSubmit = async (data: UploadAvatarType) => {
    await handleUploadAvatar(data)
  }

  return (
    <div className="flex items-center gap-4">
      {user?.avatar_url ? (
        <Image
          src={user.avatar_url}
          alt={user.username}
          width={60}
          height={60}
          className="aspect-square h-32 w-32 rounded-full"
        />
      ) : (
        <Image
          src="/img/placeholder.jpeg"
          alt="Avatar"
          width={32}
          height={32}
          className="aspect-square h-32 w-32 rounded-full"
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="file"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input
                    accept=".jpg, .jpeg, .png, .svg, .webp"
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size="sm" type="submit" className="flex gap-2">
            <Import /> Importer
          </Button>
        </form>
      </Form>
    </div>
  )
}
