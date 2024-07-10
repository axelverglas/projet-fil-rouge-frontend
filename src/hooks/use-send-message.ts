import {useMutation, useQueryClient} from '@tanstack/react-query'
import {sendMessage} from '@/actions/chat'
import toast from 'react-hot-toast'
import {Message} from '@/types'

export const useSendMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newMessage: Partial<Message>) => {
      await sendMessage(newMessage)
    },
    onSuccess: (data, variables) => {
      toast.success('Message sent')
      queryClient.invalidateQueries({
        queryKey: ['conversation', variables.sender_id, variables.receiver_id]
      })
    },
    onError: () => {
      toast.error('Failed to send message')
    }
  })
}
