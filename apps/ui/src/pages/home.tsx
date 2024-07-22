import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useNews } from '@hacker-news/ui-hooks';
import {
  MainLayout,
  NewsList,
  useCustomTheme,
} from '@hacker-news/ui-components';

export const HomePage = () => {
  const { newsData, newsLoading, newsError, getMoreNews } = useNews();
  const { currentTheme } = useCustomTheme();

  return (
    <MainLayout>
      {newsError ? (
        <Typography
          fontFamily={currentTheme.typography.secondaryFontFamily}
          fontSize={20}
          fontWeight={700}
        >
          Something went wrong
        </Typography>
      ) : newsData.length === 0 ? (
        <Grid container justifyContent="center">
          <CircularProgress size="50px" color="inherit" />
        </Grid>
      ) : (
        <NewsList
          news={newsData}
          getMoreNews={() => getMoreNews()}
          loadingNews={newsLoading}
        />
      )}
    </MainLayout>
  );
};

export default HomePage;
