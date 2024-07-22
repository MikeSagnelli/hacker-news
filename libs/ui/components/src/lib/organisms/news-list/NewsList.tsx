import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import styled from '@mui/system/styled';

import type { INews } from '@hacker-news/ui-reducers';

import { NewsItem } from '../';
import { Button } from '../../atoms';

interface INewsList {
  news: INews[];
  getMoreNews?: () => void;
  loadingNews?: boolean;
}

const StyledOl = styled('ol')({
  display: 'flex',
  flexDirection: 'column',
  gap: '26px',
});

export const NewsList = ({ news, getMoreNews, loadingNews }: INewsList) => (
  <>
    <List component={StyledOl}>
      {news.map((item, index) => (
        <ListItem key={item.id} disablePadding>
          <NewsItem {...item} index={index + 1} />
        </ListItem>
      ))}
    </List>
    {!!getMoreNews && (
      <Box marginLeft="42px">
        <Button
          onClick={() => {
            getMoreNews();
          }}
          label="show more"
          loading={loadingNews}
        />
      </Box>
    )}
  </>
);

export default NewsList;
