import { useStore } from '@nanostores/preact';
import { useMemo } from 'preact/hooks';

import { Button } from '@/ui/Button/Button';
import { Text } from '@/ui/Text/Text';

import { loadNext, loadPrevious } from '../../actions';

import './styles.css';
import { $cardPickerModalStore } from '../../store';

const noop = () => {};

export const Pagination = () => {
  const {
    selectedSetNumber,
    sets,
    pagination: {
      offset,
    },
    isLoadPreviousEnabled,
    isLoadNextEnabled,
  } = useStore($cardPickerModalStore);

  const cardsLength = useMemo(() => {
    return sets[selectedSetNumber]?.length || 0;
  }, [selectedSetNumber]);

  return (
    <div className="card-picker-pagination">
      <Button
        color="white"
        disabled={!isLoadPreviousEnabled}
        onClick={loadPrevious}
      >
        <Text size="lg">{'<'}</Text>
      </Button>

      <Button
        color="white"
        onClick={noop}
      >
        <Text size="lg">{offset}</Text>
        <Text size="lg">/</Text>
        <Text size="lg">{cardsLength}</Text>
      </Button>

      <Button
        color="white"
        disabled={!isLoadNextEnabled}
        onClick={loadNext}
      >
        <Text size="lg">{'>'}</Text>
      </Button>
    </div>
  );
};
