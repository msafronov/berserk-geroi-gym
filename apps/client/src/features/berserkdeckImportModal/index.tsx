import { memo, useCallback } from 'preact/compat';
import { useStore } from '@nanostores/preact';

import * as Modal from '@/ui/Modal';
import { Text } from '@/ui/Text/Text';
import { Button } from '@/ui/Button/Button';

import { $berserkdeckImportModalStore } from './store';
import { closeBerserkdeckImportModal, importDeck } from './actions';

import { Form } from './components/Form/Form';

export const BerserkdeckimportModal = memo(() => {
  const { isOpened, isLoading, error, deckId } = useStore($berserkdeckImportModalStore);

  const onCloseClick = useCallback(() => {
    closeBerserkdeckImportModal();
  }, []);

  const onImportClick = useCallback(() => {
    importDeck();
  }, []);

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
          Импорт колоды с Berserkdeck
        </Text>
      </Modal.Header>

      <Modal.Body>
        <Form />
      </Modal.Body>

      <Modal.Footer>
        <Button
          color="white"
          onClick={onCloseClick}
        >
          <Text color="black">
            Отмена
          </Text>
        </Button>

        <Button
          color="violett"
          disabled={isLoading || !!error || !deckId}
          onClick={onImportClick}
        >
          {
            isLoading
              ? (
                <Text color="white">
                  Загрузка...
                </Text>
              )
              : (
                <Text color="white">
                  Импортировать
                </Text>
              )
          }
        </Button>
      </Modal.Footer>
    </Modal.Wrapper>
  );
});
