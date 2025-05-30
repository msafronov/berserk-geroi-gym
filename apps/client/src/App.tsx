import { useEffect } from 'preact/hooks';

import { StartScreenModal } from '@/features/startScreenModal';
import { openStartScreenModal } from '@/features/startScreenModal/actions';
import { DecksModal } from '@/features/decksModal';

export const App = () => {
  useEffect(() => {
    openStartScreenModal();
  }, []);

  return (
    <>
      <StartScreenModal />
      <DecksModal />
    </>
  );
};
