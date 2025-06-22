import { useEffect } from 'preact/hooks';

import { StartScreenModal } from '@/features/startScreenModal';
import { DecksModal } from '@/features/decksModal';

import { openStartScreenModal } from '@/features/startScreenModal/actions';
import { initializeUserDatabase } from '@/features/database/actions';
import { DeckEditorModal } from '@/features/deckEditorModal';
import { CardPickerModal } from '@/features/cardPickerModal';
import { GameTable } from '@/features/gameTable';
import { ActiveCardZoom } from '@/features/activeCardZoom';
import { LeftMenuPanel } from '@/features/leftMenuPanel';
import { ConfirmationModal } from '@/features/confirmationModal';

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
      <ConfirmationModal />

      <GameTable />

      <LeftMenuPanel />

      <ActiveCardZoom />
    </>
  );
};
