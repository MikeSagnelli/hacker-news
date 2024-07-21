import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'
import Link, { LinkBaseProps } from '@mui/material/Link'
import styled from '@mui/system/styled';
import { useCustomTheme } from '../style-wrapper';

interface ILink extends LinkBaseProps {
  url: string;
  children: ReactNode;
  color?: string;
}

const StyledLink = styled(Link)`
  cursor: pointer;
`

export const TextLink = ({ url, children, color, ...props }: ILink) => {
  const { currentTheme } = useCustomTheme()
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    navigate(url)
  }

  return (
    <StyledLink
      onClick={handleClick}
      color={color ?? currentTheme.typography.primaryColor}
      underline='none'
      {...props}
    >
      {children}
    </StyledLink>
  )
}
