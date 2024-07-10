import React from 'react'
import {cn} from '@/lib/utils'
import {Message} from '@/types'
import {format, toZonedTime} from 'date-fns-tz'

interface ChatBubbleProps {
  message: Message
  isOwnMessage: boolean
}

const ChatBubble: React.FC<ChatBubbleProps> = ({message, isOwnMessage}) => {
  console.log(message)
  return (
    <div
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div className="flex flex-col items-end">
        <div
          className={cn(
            'inline-block max-w-xs rounded-lg p-2',
            isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'
          )}
        >
          <p>{message.content}</p>
        </div>
        <small className="mt-1 text-xs text-gray-500">
          {message.created_at}
        </small>
      </div>
    </div>
  )
}

export default ChatBubble
