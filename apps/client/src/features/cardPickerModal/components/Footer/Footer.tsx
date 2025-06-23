import { useStore } from '@nanostores/preact';

import { Text } from '@/ui/Text/Text';
import { Button } from '@/ui/Button/Button';

import { $cardPickerModalStore } from '../../store';

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

const noop = () => {};

export const Footer = ({ onClose, onConfirm }: Props) => {
  const { selectedCardsCount } = useStore($cardPickerModalStore);

  if (selectedCardsCount === 0) {
    return (
      <>
        <Button color="white" onClick={onClose}>
          <Text color="black">
            Закрыть
          </Text>
        </Button>

        <Button color="violett" onClick={noop} disabled={true}>
          <Text color="white">
            Выбрать
          </Text>
        </Button>
      </>
    );
  }

  return (
    <>
    <Button color="white" onClick={onClose}>
      <Text color="black">
        Закрыть
      </Text>
    </Button>

    <Button color="violett" onClick={onConfirm}>
      <Text color="white">
        {`Выбрать (${selectedCardsCount})`}
      </Text>
    </Button>
    </>
  );
};
