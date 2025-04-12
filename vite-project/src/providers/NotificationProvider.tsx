import { createContext, useContext, ReactNode, FC } from 'react'
import { notification } from 'antd'

interface Props {
  children: ReactNode
}

type NotifyFunction = (args: { message: string; description?: string }) => void
interface NotificationService {
  notifySuccess: NotifyFunction
  notifyWarning: NotifyFunction
  notifyError: NotifyFunction
  notifyInfo: NotifyFunction
}

const NotificationContext = createContext<NotificationService | null>(null)

export function useNotificationService() {
  return useContext(NotificationContext)
}
export const NotificationProvider: FC<Props> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification()
  const notifySuccess: NotifyFunction = ({ message, description }) =>
    api.success({ message, description })
  const notifyWarning: NotifyFunction = ({ message, description }) =>
    api.warning({ message, description })
  const notifyError: NotifyFunction = ({ message, description }) =>
    api.error({ message, description })
  const notifyInfo: NotifyFunction = ({ message, description }) =>
    api.info({ message, description })

  return (
    <NotificationContext.Provider
      value={
        {
          notifySuccess,
          notifyWarning,
          notifyError,
          notifyInfo,
        } as NotificationService
      }
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
