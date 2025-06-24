import { useStore } from '@nanostores/preact';

import { Button } from '@/ui/Button/Button';
import { Text } from '@/ui/Text/Text';

import { loadNext, loadPrevious } from '../../actions';
import { $cardPickerModalStore } from '../../store';

import './styles.css';

const noop = () => {};

export const Pagination = () => {
  const {
    cards,
    selectedSetNumber,
    pagination: {
      offset,
    },
    isLoadPreviousEnabled,
    isLoadNextEnabled,
  } = useStore($cardPickerModalStore);

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
        <Text size="lg">{cards[selectedSetNumber]?.length || 0}</Text>
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
