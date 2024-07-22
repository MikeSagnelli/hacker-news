import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LinkBaseProps } from '@mui/material/Link';
import Link from '@mui/material/Link';
import styled from '@mui/system/styled';
import { useCustomTheme } from '../style-wrapper';

interface ILink extends LinkBaseProps {
  url: string;
  children: ReactNode;
  color?: string;
  isExternal?: boolean;
}

const StyledLink = styled(Link)`
  cursor: pointer;
`;

export const TextLink = ({
  url,
  children,
  color,
  isExternal,
  ...props
}: ILink) => {
  const { currentTheme } = useCustomTheme();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (isExternal) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(url);
    }
  };

  return (
    <StyledLink
      onClick={handleClick}
      color={color ?? currentTheme.typography.primaryColor}
      underline="none"
      {...props}
    >
      {children}
    </StyledLink>
  );
};

export default TextLink;
