import { memo } from 'preact/compat';

import { Wrapper } from './components/Wrapper/Wrapper';

import { Title } from './components/Title/Title';
import { NewGameMenuItem } from './components/MenuItem/NewGameMenuItem';
import { HomeMenuItem } from './components/MenuItem/HomeMenuItem';
import { AddCardMenuItem } from './components/MenuItem/AddCardMenuItem';

export const LeftMenuPanel = memo(() => {
  return (
    <Wrapper>
      <Title />
      <HomeMenuItem />
      <NewGameMenuItem />
      <AddCardMenuItem />
    </Wrapper>
  );
});
