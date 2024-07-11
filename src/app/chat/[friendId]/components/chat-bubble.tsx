import React from 'react'
import {cn} from '@/lib/utils'
import {Message} from '@/types'
import {format, parseISO} from 'date-fns'
import {fr} from 'date-fns/locale'

interface ChatBubbleProps {
  message: Message
  isOwnMessage: boolean
}

const ChatBubble: React.FC<ChatBubbleProps> = ({message, isOwnMessage}) => {
  const formattedDate = message.created_at
    ? format(parseISO(message.created_at), 'Pp', {locale: fr})
    : 'Date non disponible'
  console.log('message', message)
  return (
    <div
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div
        className={cn(
          'flex flex-col',
          isOwnMessage ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'inline-block w-fit max-w-xs rounded-lg p-2',
            isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'
          )}
        >
          <p>{message.content}</p>
        </div>
        <small className="mt-1 text-xs text-gray-500">{formattedDate}</small>
      </div>
    </div>
  )
}

export default ChatBubble
