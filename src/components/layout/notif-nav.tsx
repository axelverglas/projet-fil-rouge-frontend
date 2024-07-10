'use client'
import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {useNotifications} from '@/hooks/use-notifications'
import {BellIcon, CheckCircleIcon, CircleIcon, Trash} from 'lucide-react'
import {Notification, User} from '@/types'
import {useMutation, useQuery} from '@tanstack/react-query'
import Link from 'next/link'
import {
  DeleteNotificationType,
  MarkNotificationAsReadType
} from './notification/notification.schema'
import {
  handleDeleteNotification,
  MarkNotificationAsRead
} from './notification/notification.action'
import toast from 'react-hot-toast'
import queryClient from '@/lib/query-client'

export function NotifNav({user}: {user: User}) {
  const {data: notifications = []} = useQuery(
    useNotifications({userId: user._id})
  )

  const markAsRead = useMutation({
    mutationFn: async (values: MarkNotificationAsReadType) => {
      const {serverError} = await MarkNotificationAsRead(values)
      if (serverError) {
        toast.error(serverError)
        return
      }

      toast.success('Notification marquée comme lue')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications', user._id]
      })
    }
  })

  const deleteAllNotifications = useMutation({
    mutationFn: async (values: DeleteNotificationType) => {
      const {serverError} = await handleDeleteNotification(values)
      if (serverError) {
        toast.error(serverError)
        return
      }

      toast.success('Notifications effacées')
      queryClient.invalidateQueries({
        queryKey: ['notifications', user._id]
      })
    }
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-2">
          <BellIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {notifications.length > 0 ? (
          notifications.map((notification: Notification) => (
            <DropdownMenuItem
              key={notification._id}
              className={`flex items-center ${notification.read ? 'opacity-50' : ''}`}
              onClick={async () => {
                markAsRead.mutate({notifId: notification._id})
              }}
            >
              {notification.read ? (
                <CheckCircleIcon className="mr-2 h-4 text-gray-400" />
              ) : (
                <CircleIcon className="text- mr-2 h-4 text-foreground" />
              )}
              {notification.notif_type === 'chat' ? (
                <span>{notification.content}</span>
              ) : (
                <span>{notification.content}</span>
              )}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuLabel className="text-sm font-medium text-gray-500">
            Aucune notifications
          </DropdownMenuLabel>
        )}
        {notifications.length > 0 && (
          <DropdownMenuItem
            className="text-red-500"
            onClick={async () => {
              deleteAllNotifications.mutate({userId: user._id})
            }}
          >
            Effacer <Trash className="ml-2 h-3 w-3" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
