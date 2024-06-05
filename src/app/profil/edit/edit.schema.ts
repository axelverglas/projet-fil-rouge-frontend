import {z} from 'zod'

export const uploadAvatarSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
          file.type
        ),
      {
        message: 'Please upload a valid image file (jpeg, png, gif, webp).'
      }
    )
})

export type UploadAvatarType = z.infer<typeof uploadAvatarSchema>
