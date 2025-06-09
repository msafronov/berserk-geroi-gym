import { Text } from '@/ui/Text/Text';

import './styles.css';
import { Counter } from './Counter';

type Props = {
  value: number;
};

export const RedCounter = ({ value }: Props) => {
  return (
    <Counter color="red">
      <Text size="sm" color="white" weight="bold">
        {value}
      </Text>
    </Counter>
  );
};
