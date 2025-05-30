import { Text } from '@/ui/Text/Text';

import './styles.css';

export const Title = () => {
  return (
    <>
      <Text
        size="lg"
        color="violett"
        weight="bold"
      >
        Berserk Geroi
      </Text>

      <Text>{'\u00A0'}</Text>

      <Text
        size="lg"
        color="purple"
        weight="bold"
      >
        GYM
      </Text>
    </>
  );
};
