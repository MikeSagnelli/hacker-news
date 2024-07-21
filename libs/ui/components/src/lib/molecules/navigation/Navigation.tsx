import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import styled from '@mui/system/styled';

import { TextLink, useCustomTheme } from '../../atoms';
import type { ITheme } from '../../../theme';

interface INavigation {
  routes: {
    url: string;
    label: string;
  }[];
}

const Nav = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'currentTheme',
})<{ currentTheme: ITheme }>(({ currentTheme }) => ({
  paddingInline: '10px',
  '&:not(:first-of-type)': {
    borderLeft: `1px solid ${currentTheme?.typography.primaryColor}`,
  },
}));

export const Navigation = ({ routes }: INavigation) => {
  const { pathname } = useLocation();
  const { currentTheme } = useCustomTheme();

  return (
    <Grid container direction="row" width="fit-content">
      {routes.map(({ url, label }, index) => {
        const isCurrentPathname = pathname === url;

        return (
          <Nav
            currentTheme={currentTheme}
            item
            key={`nav-${url}-${label}-${index}`}
          >
            <TextLink
              url={url}
              color={
                isCurrentPathname
                  ? currentTheme.typography.accentColor
                  : undefined
              }
              fontFamily={currentTheme.typography.primaryFontFamily}
              fontSize={14}
              fontWeight={isCurrentPathname ? 800 : undefined}
            >
              {label}
            </TextLink>
          </Nav>
        );
      })}
    </Grid>
  );
};

export default Navigation;
