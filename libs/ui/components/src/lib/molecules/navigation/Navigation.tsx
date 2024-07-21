import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid'
import styled from '@mui/system/styled';

import { TextLink, useCustomTheme } from '../../atoms'
import { ITheme } from '../../../theme';

interface INavigation {
  routes: {
    url: string;
    label: string;
  }[];
}

const Nav = styled(Grid)<{ $theme: ITheme }>`
  padding-inline: 10px;

  &:not(:first-child) {
    border-left: 1px solid ${({ $theme }) => $theme?.typography.primaryColor};
  }
`

export const Navigation = ({ routes }: INavigation) => {
  const { pathname } = useLocation()
  const { currentTheme } = useCustomTheme()

  return (
    <Grid container direction="row">
      {routes.map(({ url, label }, index) => {
        const isCurrentPathname = pathname === url

        return (
          <Nav $theme={currentTheme} item key={`nav-${url}-${label}-${index}`}>
            <TextLink
              url={url}
              color={isCurrentPathname ? currentTheme.typography.accentColor : undefined}
              fontWeight={isCurrentPathname ? 700 : undefined}
            >
              {label}
            </TextLink>
          </Nav>
        )
      })}
    </Grid>
  )
}

export default Navigation
