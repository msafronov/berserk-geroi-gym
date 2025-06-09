import { useCallback } from 'preact/hooks';

import { Button } from '@/ui/Button/Button';
import { Text } from '@/ui/Text/Text';

import { mixActiveCardToDeck } from '../../../../actions';

import type { ActiveCardMenuItems } from './ActiveCardMenuItems';

export const GraveyardActiveCardMenuItems = ({ card }: ActiveCardMenuItems) => {
  const onMix = useCallback(() => {
    mixActiveCardToDeck();
  }, []);

  return (
    <>
      <Button size="lg" color="violett" onClick={onMix}>
        <Text color="white" size="sm" weight="bold">Замешать</Text>
      </Button>
    </>
  );
};
