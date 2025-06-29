import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./i18n/i18n.ts";
import { CustomThemeProvider } from './context/ThemeContext.tsx';
import { ShowNotificationProvider } from './context/notificationContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomThemeProvider>
      <ShowNotificationProvider>
        <App />
      </ShowNotificationProvider>
    </CustomThemeProvider>
  </StrictMode>,
)
