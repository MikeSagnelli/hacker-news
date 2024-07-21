import { MainLayout, NewsList } from '@hacker-news/ui-components';

const mockNew = (index: number) => ({
  id: index,
  index,
  title:
    "Physicists Create a Bizarre 'Wigner Crystal' Made Purely of Electrons",
  url: 'quantamagazine.org',
  score: 284,
  author: 'johndoe',
  time: '1 hour ago',
  comments: 24,
  starred: true,
  starPost: () => console.log('starred'),
});

const mockNews = Array.from({ length: 12 }, (_, index) => ({
  ...mockNew(index + 1),
}));

export const HomePage = () => {
  return (
    <MainLayout>
      <NewsList
        news={mockNews}
        getMoreNews={() => console.log('clicked')}
        loadingNews={false}
      />
    </MainLayout>
  );
};

export default HomePage;
