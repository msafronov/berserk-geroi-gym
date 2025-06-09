import { useCallback } from 'preact/hooks';

import { Button } from '@/ui/Button/Button';
import { Text } from '@/ui/Text/Text';

import { toggleIsFaceDownActiveCard, moveActiveCardToDeck } from '../../../../actions';

import type { ActiveCardMenuItems } from './ActiveCardMenuItems';

export const DeckActiveCardMenuItems = ({ card }: ActiveCardMenuItems) => {
  const onOpenCloseClick = useCallback(() => {
    toggleIsFaceDownActiveCard();
  }, []);

  const onMoveActiveCardToDeckLast = useCallback(() => {
    moveActiveCardToDeck('last');
  }, []);

  return (
    <>
      <Button size="lg" color="violett" onClick={onOpenCloseClick}>
        {
          card.isFaceDown
            ? <Text color="white" size="sm" weight="bold">Показать</Text>
            : <Text color="white" size="sm" weight="bold">Скрыть</Text>
        }
      </Button>

      <Button size="lg" color="violett" onClick={onMoveActiveCardToDeckLast}>
        <Text color="white" size="sm" weight="bold">Под низ колоды</Text>
      </Button>
    </>
  );
};
