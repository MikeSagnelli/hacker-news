import { HackerNewsLogo, Navigation } from '@hacker-news/ui-components';

export const HomePage = () => (
  <>
    <HackerNewsLogo />
    <Navigation
      routes={[
        {
          url: '/',
          label: 'latest',
        },
        {
          url: '/starred',
          label: 'starred',
        },
      ]}
    />
  </>
);

export default HomePage;
