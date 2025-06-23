import { memo, useCallback, useEffect } from 'preact/compat';
import { useStore } from '@nanostores/preact';

import * as Modal from '@/ui/Modal';
import { Text } from '@/ui/Text/Text';

import { $cardPickerModalStore } from './store';
import { closeCardPickerModal, init, onConfirm } from './actions';
import { SetSelect } from './components/SetSelect/SetSelect';
import { CardList } from './components/CardList/CardList';
import { Pagination } from './components/Pagination/Pagination';
import { Footer } from './components/Footer/Footer';

export const CardPickerModal = memo(() => {
  const { isOpened, title } = useStore($cardPickerModalStore);

  const onCloseClick = useCallback(() => {
    closeCardPickerModal();
  }, []);

  const onConfirmClick = useCallback(() => {
    onConfirm();
    closeCardPickerModal();
  }, []);

  useEffect(() => {
    if (isOpened) {
      init();
    }
  }, [isOpened]);

  if (!isOpened) {
    return null;
  }

  return (
    <Modal.Wrapper size="md">
      <Modal.Header onClose={onCloseClick}>
        <Text
          size="lg"
          weight="bold"
        >
          {title}
        </Text>
      </Modal.Header>

      <Modal.Body>
        <SetSelect />
        <Pagination />
        <CardList />
      </Modal.Body>

      <Modal.Footer>
        <Footer
          onClose={onCloseClick}
          onConfirm={onConfirmClick}
        />
      </Modal.Footer>
    </Modal.Wrapper>
  );
});
