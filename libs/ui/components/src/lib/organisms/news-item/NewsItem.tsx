import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';

import { StarIcon, useCustomTheme } from '../../atoms';

interface ISubTypography extends TypographyProps {
  text: string;
}

export interface INewsItem {
  id: number;
  index: number;
  title: string;
  url: string;
  author: string;
  score: number;
  time: string;
  comments: number;
  starred: boolean;
  starPost: () => void;
}

export const NewsItem = ({
  index,
  title,
  url,
  author,
  score,
  time,
  comments,
  starred,
  starPost,
}: INewsItem) => {
  const { currentTheme } = useCustomTheme();

  const SubTypography = ({ text, ...props }: ISubTypography) => (
    <Typography
      color={currentTheme.typography.secondaryColor}
      fontFamily={currentTheme.typography.primaryFontFamily}
      fontSize={14}
      fontWeight={400}
      lineHeight={1}
      {...props}
    >
      {text}
    </Typography>
  );

  return (
    <Grid container display="flex" direction="row" gap="10px">
      <Grid>
        <Typography
          color={currentTheme.typography.secondaryColor}
          fontFamily={currentTheme.typography.secondaryFontFamily}
          fontSize={18}
          fontWeight={400}
          minWidth={30}
          lineHeight={1}
          textAlign="right"
        >
          {`${index}.`}
        </Typography>
      </Grid>
      <Grid display="flex" flexDirection="column" rowGap="10px">
        <Grid alignItems="center" display="flex" flexDirection="row" gap="12px">
          <Typography
            color={currentTheme.typography.primaryColor}
            fontFamily={currentTheme.typography.secondaryFontFamily}
            fontSize={18}
            fontWeight={700}
            lineHeight={1}
          >
            {title}
          </Typography>
          <SubTypography text={`(${url})`} />
        </Grid>
        <Grid alignItems="center" display="flex" flexDirection="row">
          <SubTypography
            text={`${score} points by ${author} ${time}`}
            paddingRight="10px"
          />
          <SubTypography
            text={`${comments} comments`}
            paddingInline="10px"
            borderLeft={`1px solid ${currentTheme.typography.secondaryColor}`}
            borderRight={`1px solid ${currentTheme.typography.secondaryColor}`}
          />
          <Grid
            alignItems="center"
            display="flex"
            flexDirection="row"
            gap="3px"
          >
            <IconButton onClick={starPost} size="small">
              <StarIcon filled={starred} />
            </IconButton>
            <SubTypography text={starred ? 'saved' : 'save'} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewsItem;
