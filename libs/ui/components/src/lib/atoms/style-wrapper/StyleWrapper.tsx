import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/system/GlobalStyles';
import type { ITheme } from '../../../theme';
import { createGlobalStyles, theme } from '../../../theme';

interface IStyleWrapper {
  initialTheme?: ITheme;
  children: ReactNode;
}

interface IThemeContext {
  currentTheme: ITheme;
  setCurrentTheme: (theme: ITheme) => void;
}

const CustomThemeContext = createContext<IThemeContext | undefined>(undefined);

export const StyleWrapper = ({
  children,
  initialTheme = theme.light,
}: IStyleWrapper) => {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  const globalStyles = createGlobalStyles(currentTheme);

  return (
    <CustomThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      {children}
    </CustomThemeContext.Provider>
  );
};

export const useCustomTheme = () => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error('useCustomTheme must be used within a StyledWrapper');
  }
  return context;
};

export default StyleWrapper;
