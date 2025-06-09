import { useEffect } from 'preact/hooks';

import { StartScreenModal } from '@/features/startScreenModal';
import { DecksModal } from '@/features/decksModal';

import { openStartScreenModal } from '@/features/startScreenModal/actions';
import { initializeUserDatabase } from '@/features/database/actions';
import { DeckEditorModal } from '@/features/deckEditorModal';
import { CardPickerModal } from '@/features/cardPickerModal';

export const App = () => {
  useEffect(() => {
    initializeUserDatabase();
    openStartScreenModal();
  }, []);

  return (
    <>
      <StartScreenModal />
      <DecksModal />
      <DeckEditorModal />
      <CardPickerModal />
    </>
  );
};
