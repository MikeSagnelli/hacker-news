import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'
import ThemeProvider from '@mui/system/ThemeProvider'
import type { ITheme } from '../../../theme'
import { theme } from '../../../theme'

interface IStyleWrapper {
  children: ReactNode
}

interface IThemeContext {
  currentTheme: ITheme;
  setCurrentTheme: (theme: ITheme) => void
}

const CustomThemeContext = createContext<IThemeContext | undefined>(undefined)

export const StyleWrapper = ({ children }: IStyleWrapper) => {
  const [currentTheme, setCurrentTheme] = useState(theme.light)

  return (
    <CustomThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <ThemeProvider theme={currentTheme}>
        {children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  )
}

export const useCustomTheme = () => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error('useCustomTheme must be used within a StyledWrapper')
  }
  return context
}

export default StyleWrapper
