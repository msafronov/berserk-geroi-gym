import { memo, useCallback } from 'preact/compat';
import { useStore } from '@nanostores/preact';

import { Text } from '@/ui/Text/Text';
import { Button } from '@/ui/Button/Button';

import { changeActiveCardCounter } from '../../../../../../actions';
import { $gameTableStore } from '../../../../../../store';

import { BlackCounter } from '../Counter/BlackCounter';
import { Controls } from './Controls';

import './styles.css';

export const BlackControls = memo(() => {
  const { activeGameTableCard } = useStore($gameTableStore);

  const onIncrease = useCallback(() => {
    changeActiveCardCounter('counterBlack', 'increase');
  }, []);

  const onDecrease = useCallback(() => {
    changeActiveCardCounter('counterBlack', 'decrease');
  }, []);

  return (
    <Controls>
      <Button size="lg2" padding="sm2" color="white" onClick={onIncrease}>
        <Text size="sm">+</Text>
      </Button>
      
      <BlackCounter
        value={activeGameTableCard?.counterBlack || 0}
      />

      <Button size="lg2" padding="sm2" color="white" onClick={onDecrease}>
        <Text size="sm">-</Text>
      </Button>
    </Controls>
  );
});
