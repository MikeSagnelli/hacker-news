import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { Navigation } from '../../molecules';
import { useCustomTheme } from '../../atoms';

export const Footer = () => {
  const { currentTheme } = useCustomTheme();

  return (
    <footer>
      <Grid
        alignItems="center"
        alignSelf="flex-end"
        borderTop={`2px solid ${currentTheme.global.secondaryColor}`}
        container
        display="flex"
        flexDirection="column"
        rowGap="16px"
        justifyContent="center"
        paddingTop="28px"
        width="100%"
      >
        <Typography
          fontFamily={currentTheme.typography.primaryFontFamily}
          fontWeight={700}
          fontSize={16}
        >
          Hacker News
        </Typography>
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
    </footer>
  );
};

export default Footer;
