import { createContext, useContext } from "react";
import { enqueueSnackbar, SnackbarProvider } from "notistack"

interface ShowNotificationContextInterface {
  sendSuccess: (message: string) => void;
  sendError: (message: string) => void;
  sendInfo: (message: string) => void
  sendWarming: (message: string) => void
  sendMessage: (message: string) => void
}

const ShowNotificationContext = createContext<ShowNotificationContextInterface>({} as ShowNotificationContextInterface)

// eslint-disable-next-line react-refresh/only-export-components
export const useShowNoti = () => useContext(ShowNotificationContext)

export const ShowNotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const sendSuccess = (message: string) => {
    enqueueSnackbar(message, { variant: "success" });
  };

  const sendError = (message: string) => {
    enqueueSnackbar(message, { variant: "error" });
  };

  const sendInfo = (message: string) => {
    enqueueSnackbar(message, { variant: "info" });
  };

  const sendWarming = (message: string) => {
    enqueueSnackbar(message, { variant: "warning" });
  };

  const sendMessage = (message: string) => {
    enqueueSnackbar(message, { variant: "default" });
  };

  return (
    <ShowNotificationContext.Provider value={{ sendSuccess, sendError, sendInfo, sendWarming, sendMessage }}>
      <SnackbarProvider>
        {children}
      </SnackbarProvider>
    </ShowNotificationContext.Provider>
  )
}