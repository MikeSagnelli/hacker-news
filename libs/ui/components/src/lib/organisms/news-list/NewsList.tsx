import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import styled from '@mui/system/styled';

import type { INewsItem } from '../';
import { NewsItem } from '../';
import { Button } from '../../atoms';

interface INewsList {
  news: INewsItem[];
  getMoreNews: () => void;
  loadingNews: boolean;
}

const StyledOl = styled('ol')({
  display: 'flex',
  flexDirection: 'column',
  gap: '26px',
});

export const NewsList = ({ news, getMoreNews, loadingNews }: INewsList) => (
  <>
    <List component={StyledOl}>
      {news.map((item) => (
        <ListItem key={item.id} disablePadding>
          <NewsItem {...item} />
        </ListItem>
      ))}
    </List>
    <Box marginLeft="42px">
      <Button
        onClick={() => {
          getMoreNews();
        }}
        label="show more"
        loading={loadingNews}
      />
    </Box>
  </>
);

export default NewsList;
