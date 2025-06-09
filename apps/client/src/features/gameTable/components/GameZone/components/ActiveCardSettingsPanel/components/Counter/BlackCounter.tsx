import { Text } from '@/ui/Text/Text';

import './styles.css';
import { Counter } from './Counter';

type Props = {
  value: number;
};

export const BlackCounter = ({ value }: Props) => {
  return (
    <Counter color="black">
      <Text size="sm" color="white" weight="bold">
        {value}
      </Text>
    </Counter>
  );
};
