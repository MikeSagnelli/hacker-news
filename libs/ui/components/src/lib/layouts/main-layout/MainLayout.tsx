import type { ReactNode } from 'react';
import Grid from '@mui/material/Grid';

import { Footer, Header } from '../../organisms';

interface IMainLayout {
  children: ReactNode;
}

export const MainLayout = ({ children }: IMainLayout) => (
  <Grid
    data-testid="main-layout"
    display="flex"
    flexDirection="column"
    minHeight="calc(100vh - 4px)"
    paddingBottom={{ xs: '30px' }}
    paddingInline={{ xs: '90px' }}
    paddingTop={{ xs: '45px' }}
    rowGap={{ xs: '54px' }}
  >
    <Grid
      display="flex"
      flex={1}
      flexDirection="column"
      rowGap={{ xs: '60px' }}
    >
      <Header />
      {children}
    </Grid>
    <Grid flex={0}>
      <Footer />
    </Grid>
  </Grid>
);

export default MainLayout;
