import { createContext, useContext, useMemo, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { darkTheme, lightTheme } from '../theme'

const ThemeToggleContext = createContext({
  toggleTheme: () => {},
  mode: 'light' as 'light' | 'dark',
})

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeToggle = () => useContext(ThemeToggleContext)

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode])

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  )
}
