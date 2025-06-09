import { memo, useCallback } from 'preact/compat';
import { useStore } from '@nanostores/preact';

import { Text } from '@/ui/Text/Text';
import { Button } from '@/ui/Button/Button';

import { changeActiveCardCounter } from '../../../../../../actions';
import { $gameTableStore } from '../../../../../../store';

import { WhiteCounter } from '../Counter/WhiteCounter';
import { Controls } from './Controls';

import './styles.css';

export const WhiteControls = memo(() => {
  const { activeGameTableCard } = useStore($gameTableStore);

  const onIncrease = useCallback(() => {
    changeActiveCardCounter('counterWhite', 'increase');
  }, []);

  const onDecrease = useCallback(() => {
    changeActiveCardCounter('counterWhite', 'decrease');
  }, []);

  return (
    <Controls>
      <Button size="lg2" padding="sm2" color="white" onClick={onIncrease}>
        <Text size="sm">+</Text>
      </Button>

      <WhiteCounter
        value={activeGameTableCard?.counterWhite || 0}
      />

      <Button size="lg2" padding="sm2" color="white" onClick={onDecrease}>
        <Text size="sm">-</Text>
      </Button>
    </Controls>
  );
});
