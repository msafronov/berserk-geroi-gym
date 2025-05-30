import { memo } from 'preact/compat';
import { useStore } from '@nanostores/preact';

import * as Modal from '@/ui/Modal';

import { $startScreenModalStore } from './store';

import { Wrapper } from './components/Wrapper/Wrapper';
import { WrapperPanel } from './components/WrapperPanel/WrapperPanel';
import { Description } from './components/Description/Description';
import { SocialMedia } from './components/SocialMedia/SocialMedia';
import { Decks } from './components/Decks/Decks';
import { Title } from './components/Title/Title';

export const StartScreenModal = memo(() => {
  const { isOpened } = useStore($startScreenModalStore);

  if (!isOpened) {
    return null;
  }

  return (
    <Modal.Wrapper size="sm">
      <Modal.Header>
        <Title />
      </Modal.Header>

      <Modal.Body>
        <Wrapper>
          <WrapperPanel>
            <Decks />
          </WrapperPanel>

          <WrapperPanel borderLeft>
            <Description />
            <SocialMedia />
          </WrapperPanel>
        </Wrapper>
      </Modal.Body>
    </Modal.Wrapper>
  );
});
