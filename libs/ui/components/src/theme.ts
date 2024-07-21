export interface ITheme {
  mode: string;
  typography: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    primaryFontFamily: string;
    secondaryFontFamily: string;
  };
  global: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export const theme = {
  light: {
    mode: 'light',
    typography: {
      primaryColor: 'rgba(0,0,0,1)',
      secondaryColor: 'rgba(0,0,0,0.5)',
      accentColor: 'rgba(254,113,57,1)',
      primaryFontFamily: '"Open Sans", sans-serif',
      secondaryFontFamily: '"Ubuntu Mono", monospace',
    },
    global: {
      primaryColor: 'rgba(255,255,255,1)',
      secondaryColor: 'rgba(254,113,57,1)',
    },
  },
  dark: {
    mode: 'dark',
    typography: {
      primaryColor: 'rgba(255,255,255,1)',
      secondaryColor: 'rgba(255,255,255,0.5)',
      accentColor: 'rgba(254,113,57,1)',
      primaryFontFamily: '"Open Sans", sans-serif',
      secondaryFontFamily: '"Ubuntu Mono", monospace',
    },
    global: {
      primaryColor: 'rgba(30,32,37,1)',
      secondaryColor: 'rgba(254,113,57,1)',
    },
  },
};

export const createGlobalStyles = (currentTheme: ITheme) => ({
  body: {
    borderTop: `4px solid ${currentTheme.global.secondaryColor}`,
    backgroundColor: currentTheme.global.primaryColor,
    color: currentTheme.typography.primaryColor,
    fontFamily: [
      '"Open Sans"',
      'sans-serif',
      '"Ubuntu Mono"',
      'monospace',
    ].join(','),
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: 1,
  },
});
