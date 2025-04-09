import React, { createContext, useContext } from "react";
import { notification } from "antd";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [api, contextHolder] = notification.useNotification();

  const notifySuccess = ({ message, description }) =>
    api.success({ message, description });
  const notifyWarning = ({ message, description }) =>
    api.warning({ message, description });
  const notifyError = ({ message, description }) =>
    api.error({ message, description });
  const notifyInfo = ({ message, description }) =>
    api.info({ message, description });

  return (
    <NotificationContext.Provider
      value={{
        notifySuccess,
        notifyWarning,
        notifyError,
        notifyInfo,
      }}
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}


export function useNotificationService() {
    return useContext(NotificationContext);
  }
