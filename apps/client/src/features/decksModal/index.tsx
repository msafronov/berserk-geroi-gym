import { memo, useCallback } from 'preact/compat';
import { useStore } from '@nanostores/preact';

import * as Modal from '@/ui/Modal';
import { Text } from '@/ui/Text/Text';
import { Button } from '@/ui/Button/Button';
import { Icon } from '@/ui/Icon/Icon';

import { openStartScreenModal } from '@/features/startScreenModal/actions';
import { openDeckEditorModalForEdit, openDeckEditorModalWithCreation } from '@/features/deckEditorModal/actions';
import { openBerserkdeckImportModal } from '@/features/berserkdeckImportModal/actions';

import { $decksModalStore } from './store';
import { closeDecksModal } from './actions';

import { DeckList } from './components/DeckList/DeckList';
import { BerserkdeckButton } from './components/BerserkdeckButton/BerserkdeckButton';

export const DecksModal = memo(() => {
  const { isOpened } = useStore($decksModalStore);

  const onClose = useCallback(() => {
    closeDecksModal();
    openStartScreenModal();
  }, []);

  const onBerserkdeckImportClick = useCallback(() => {
    openBerserkdeckImportModal();
  }, []);

  const onDeckCreate = useCallback(() => {
    closeDecksModal();
    openDeckEditorModalWithCreation();
  }, []);

  const onDeckEdit = useCallback((deckId: string) => {
    closeDecksModal();
    openDeckEditorModalForEdit(deckId);
  }, []);

  if (!isOpened) {
    return null;
  }

  return (
    <Modal.Wrapper size="md">
      <Modal.Header onClose={onClose}>
        <Text
          size="lg"
          weight="bold"
        >
          Колоды
        </Text>
      </Modal.Header>

      <Modal.Body>
        <DeckList onDeckEdit={onDeckEdit} />
      </Modal.Body>

      <Modal.Footer>
        <Button color="white" onClick={onClose}>
          <Text color="black">
            Закрыть
          </Text>
        </Button>

        <Button color="white" onClick={onBerserkdeckImportClick}>
          <BerserkdeckButton>
            <Icon image="berserkdeck" size="sm" />
            <Text color="black">
              Импорт с berserkdeck.ru
            </Text>
          </BerserkdeckButton>
        </Button>

        <Button color="white" onClick={onDeckCreate}>
          <Text color="black">
            Создать новую колоду
          </Text>
        </Button>
      </Modal.Footer>
    </Modal.Wrapper>
  );
});
