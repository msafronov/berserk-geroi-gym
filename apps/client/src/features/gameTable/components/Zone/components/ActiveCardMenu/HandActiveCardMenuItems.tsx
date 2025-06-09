import { useCallback } from 'preact/hooks';

import { Button } from '@/ui/Button/Button';
import { Text } from '@/ui/Text/Text';

import { moveActiveCardToDeck, mixActiveCardToDeck } from '../../../../actions';

import type { ActiveCardMenuItems } from './ActiveCardMenuItems';

export const HandActiveCardMenuItems = ({ card }: ActiveCardMenuItems) => {
  const onMoveActiveCardToDeckFirst = useCallback(() => {
    moveActiveCardToDeck('first');
  }, []);

  const onMoveActiveCardToDeckLast = useCallback(() => {
    moveActiveCardToDeck('last');
  }, []);

  const onMix = useCallback(() => {
    mixActiveCardToDeck();
  }, []);

  return (
    <>
      <Button size="lg" color="violett" onClick={onMoveActiveCardToDeckFirst}>
        <Text color="white" size="sm" weight="bold">Наверх колоды</Text>
      </Button>

      <Button size="lg" color="violett" onClick={onMoveActiveCardToDeckLast}>
        <Text color="white" size="sm" weight="bold">Под низ колоды</Text>
      </Button>

      <Button size="lg" color="violett" onClick={onMix}>
        <Text color="white" size="sm" weight="bold">Замешать</Text>
      </Button>
    </>
  );
};
