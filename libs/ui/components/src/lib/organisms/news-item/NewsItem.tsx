import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';

import { useStarredNews } from '@hacker-news/ui-hooks';
import { formatNumber, getDomainFromUrl, timeAgo } from '@hacker-news/ui-utils';

import { StarIcon, TextLink, useCustomTheme } from '../../atoms';

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
  time: number;
  comments: number;
  starred: boolean;
}

export const NewsItem = ({
  id,
  index,
  title,
  url,
  author,
  score,
  time,
  comments,
  starred,
}: INewsItem) => {
  const { currentTheme } = useCustomTheme();
  const { starNews } = useStarredNews();
  const formattedTime = time ? timeAgo(time) : '';
  const formattedScore = score ? formatNumber(score) : '';
  const formattedComments = comments ? formatNumber(comments) : '';
  const domain = url ? getDomainFromUrl(url) : '';

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
          {url && (
            <TextLink
              color={currentTheme.typography.secondaryColor}
              fontFamily={currentTheme.typography.primaryFontFamily}
              fontSize={14}
              fontWeight={400}
              lineHeight={1}
              url={url}
              isExternal
            >
              ({domain})
            </TextLink>
          )}
        </Grid>
        <Grid alignItems="center" display="flex" flexDirection="row">
          <SubTypography
            text={`${formattedScore} points by ${author} ${formattedTime}`}
            paddingRight="10px"
          />
          <SubTypography
            text={`${formattedComments} comments`}
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
            <IconButton onClick={() => starNews(id)} size="small">
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
