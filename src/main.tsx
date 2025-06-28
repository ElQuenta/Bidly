import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./i18n/i18n.ts";
import { AuthProvider } from './context/UserContext.tsx';
import { CustomThemeProvider } from './context/ThemeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomThemeProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </CustomThemeProvider>
  </StrictMode>,
)
