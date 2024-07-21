import { Routes, Route } from 'react-router-dom';

import { StyleWrapper } from '@hacker-news/ui-components';

import HomePage from '../pages/home';
import StarredPage from '../pages/starred';

export const App = () => {
  return (
    <StyleWrapper>
      <Routes>
        <Route path="/starred" Component={StarredPage} />
        <Route path="/" Component={HomePage} />
      </Routes>
    </StyleWrapper>
  );
};

export default App;
