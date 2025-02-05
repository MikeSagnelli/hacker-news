import { useCustomTheme } from '../style-wrapper';

interface IStarIcon {
  filled?: boolean;
}

export const StarIcon = ({ filled }: IStarIcon) => {
  const { currentTheme } = useCustomTheme();

  return (
    <svg
      data-testid="star-icon"
      width="14"
      height="14"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 1.30198L5.86086 3.37173L5.97814 3.65371L6.28256 3.67811L8.51703 3.85725L6.8146 5.31556L6.58266 5.51424L6.65352 5.8113L7.17364 7.99176L5.26063 6.8233L5 6.66411L4.73937 6.8233L2.82636 7.99176L3.34648 5.8113L3.41734 5.51424L3.1854 5.31556L1.48297 3.85725L3.71744 3.67811L4.02186 3.65371L4.13914 3.37173L5 1.30198Z"
        stroke={
          !filled
            ? currentTheme.typography.secondaryColor
            : currentTheme.typography.accentColor
        }
        fill={filled ? currentTheme.typography.accentColor : undefined}
      />
    </svg>
  );
};

export default StarIcon;
