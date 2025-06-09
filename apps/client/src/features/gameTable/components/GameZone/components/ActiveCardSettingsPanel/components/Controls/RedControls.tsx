import { memo, useCallback } from 'preact/compat';
import { useStore } from '@nanostores/preact';

import { Text } from '@/ui/Text/Text';
import { Button } from '@/ui/Button/Button';

import { changeActiveCardCounter } from '../../../../../../actions';
import { $gameTableStore } from '../../../../../../store';

import { RedCounter } from '../Counter/RedCounter';
import { Controls } from './Controls';

import './styles.css';

export const RedControls = memo(() => {
  const { activeGameTableCard } = useStore($gameTableStore);

  const onIncrease = useCallback(() => {
    changeActiveCardCounter('counterRed', 'increase');
  }, []);

  const onDecrease = useCallback(() => {
    changeActiveCardCounter('counterRed', 'decrease');
  }, []);

  return (
    <Controls>
      <Button size="lg2" padding="sm2" color="white" onClick={onIncrease}>
        <Text size="sm">+</Text>
      </Button>

      <RedCounter
        value={activeGameTableCard?.counterRed || 0}
      />

      <Button size="lg2" padding="sm2" color="white" onClick={onDecrease}>
        <Text size="sm">-</Text>
      </Button>
    </Controls>
  );
});
