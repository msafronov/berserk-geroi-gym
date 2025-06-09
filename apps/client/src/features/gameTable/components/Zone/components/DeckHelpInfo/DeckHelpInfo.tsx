import { Text } from '@/ui/Text/Text';
import { Icon } from '@/ui/Icon/Icon';

export const DeckHelpInfo = () => {
  return (
    <>
      <Icon image="arrow-left" size="sm" />

      <Text size="sm">
        Верх колоды
      </Text>

      <Text size="sm">|</Text>

      <Text size="sm">
        Низ колоды
      </Text>

      <Icon image="arrow-right" size="sm" />
    </>
  );
};
