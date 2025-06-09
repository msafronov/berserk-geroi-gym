import { Text } from '@/ui/Text/Text';

import './styles.css';
import { Counter } from './Counter';

type Props = {
  value: number;
};

export const GreenCounter = ({ value }: Props) => {
  return (
    <Counter color="green">
      <Text size="sm" color="black" weight="bold">
        {value}
      </Text>
    </Counter>
  );
};
