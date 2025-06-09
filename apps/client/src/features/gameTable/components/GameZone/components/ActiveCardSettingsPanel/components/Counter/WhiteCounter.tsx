import { Text } from '@/ui/Text/Text';

import './styles.css';
import { Counter } from './Counter';

type Props = {
  value: number;
};

export const WhiteCounter = ({ value }: Props) => {
  return (
    <Counter color="white">
      <Text size="sm" color="black" weight="bold">
        {value}
      </Text>
    </Counter>
  );
};
