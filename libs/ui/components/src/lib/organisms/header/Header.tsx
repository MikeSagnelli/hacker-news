import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';

import { HackerNewsLogo, MoonIcon, SunIcon, useCustomTheme } from '../../atoms';
import { Navigation } from '../../molecules';
import { theme } from '../../../theme';

export const Header = () => {
  const { currentTheme, setCurrentTheme } = useCustomTheme();

  return (
    <header>
      <Grid
        alignItems="center"
        container
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Grid
          alignItems="center"
          columnGap={4.5}
          container
          display="flex"
          flexDirection="row"
          rowGap={{ xs: 2 }}
          width="fit-content"
        >
          <HackerNewsLogo />
          <Navigation
            routes={[
              {
                url: '/',
                label: 'latest',
              },
              {
                url: '/starred',
                label: 'starred',
              },
            ]}
          />
        </Grid>
        <IconButton
          onClick={() =>
            setCurrentTheme(
              currentTheme.mode === 'light' ? theme.dark : theme.light
            )
          }
        >
          {currentTheme.mode === 'light' ? <MoonIcon /> : <SunIcon />}
        </IconButton>
      </Grid>
    </header>
  );
};

export default Header;
