'use client'

import React, {useState, useEffect} from 'react'
import socket from '@/lib/socket'
import {useQueryClient, useMutation, useQuery} from '@tanstack/react-query'
import {useConversation} from '@/hooks/use-conversations'
import {sendMessage} from '@/actions/chat'
import {User, Message} from '@/types'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import toast from 'react-hot-toast'
import {SendMessageType} from './message.schema'
import {sendMessageAction} from './message.action'
import ChatBubble from './chat-bubble'
import Section from '@/components/layout/section'

interface FriendsChatProps {
  user: User
  friend: User
}

const FriendsChat: React.FC<FriendsChatProps> = ({user, friend}) => {
  const queryClient = useQueryClient()
  const [message, setMessage] = useState('')

  const {data: conversation, refetch: refetchConversation} = useQuery(
    useConversation({user1Id: user._id, user2Id: friend._id})
  )

  const sendMessageMutation = useMutation({
    mutationFn: async (values: SendMessageType) => {
      const {serverError} = await sendMessageAction(values)
      if (serverError) {
        toast.error(serverError)
        return
      }

      toast.success('Message envoyé')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['conversation', user._id, friend._id, 'notifications']
      })
      refetchConversation()
    }
  })

  useEffect(() => {
    if (conversation?._id) {
      socket.emit('join_conversation', {conversation_id: conversation._id})
      socket.on('new_message', (message: Message) => {
        queryClient.setQueryData(
          ['conversation', user._id, friend._id],
          (oldData: any) => ({
            ...oldData,
            messages: [...(oldData?.messages || []), message]
          })
        )
        queryClient.invalidateQueries({
          queryKey: ['conversation', user._id, friend._id, 'notifications']
        })
      })

      return () => {
        socket.off('new_message')
      }
    }
  }, [conversation, friend._id, user._id, queryClient])

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessageMutation.mutate({
        sender_id: user._id,
        receiver_id: friend._id,
        content: message,
        conversation_id: conversation?._id as string
      })
      setMessage('')
    }
  }

  return (
    <Section>
      <div className="col container flex flex-col gap-4">
        <h2 className="text-2xl font-bold">
          Conversation avec {friend.username}
        </h2>
        {conversation?.messages.map((msg) => (
          <ChatBubble
            key={msg._id}
            message={msg}
            isOwnMessage={msg.sender_id === user!._id}
          />
        ))}
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>Envoyer</Button>
        </div>
      </div>
    </Section>
  )
}

export default FriendsChat
