import Typography from '@mui/material/Typography';

import {
  MainLayout,
  NewsList,
  useCustomTheme,
} from '@hacker-news/ui-components';
import { useStarredNews } from '@hacker-news/ui-hooks';

export const StarredPage = () => {
  const { currentTheme } = useCustomTheme();
  const { starredNews } = useStarredNews();

  return (
    <MainLayout>
      {starredNews.length ? (
        <NewsList news={starredNews} />
      ) : (
        <Typography
          fontFamily={currentTheme.typography.secondaryFontFamily}
          fontSize={20}
          fontWeight={700}
        >
          No starred news
        </Typography>
      )}
    </MainLayout>
  );
};

export default StarredPage;
