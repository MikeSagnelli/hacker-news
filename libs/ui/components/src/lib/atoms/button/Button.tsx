import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import styled from '@mui/system/styled';
import Typography from '@mui/material/Typography';

import { useCustomTheme } from '../style-wrapper';
import type { ITheme } from '../../../theme';

interface IButton {
  onClick: () => void;
  label: string;
  loading?: boolean;
}

const CustomButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'currentTheme',
})<{ currentTheme: ITheme }>(({ currentTheme }) => ({
  borderRadius: 0,
  backgroundColor: currentTheme?.global.secondaryColor,
  padding: '8px 16px',
  textTransform: 'lowercase',
  ':hover': {
    backgroundColor: currentTheme?.global.darkenedSecondaryColor,
  },
  minHeight: '38px',
  minWidth: '108px',
}));

export const Button = ({ label, loading = false, onClick }: IButton) => {
  const { currentTheme } = useCustomTheme();

  return (
    <CustomButton
      currentTheme={currentTheme}
      disabled={loading}
      onClick={onClick}
      variant="contained"
    >
      {loading ? (
        <CircularProgress color="inherit" size={16} />
      ) : (
        <Typography
          fontFamily={currentTheme.typography.primaryFontFamily}
          fontSize={14}
          fontWeight={600}
        >
          {label}
        </Typography>
      )}
    </CustomButton>
  );
};

export default Button;
