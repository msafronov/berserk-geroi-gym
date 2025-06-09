import { Text } from '@/ui/Text/Text';

import type { IGameTableCard } from '../../../../store';

import './styles.css';

type Props = {
  cards: IGameTableCard[];
}

export const Info = ({ cards }: Props) => {
  return (
    <div className="game-table-zone-info">
      <Text
        color="white"
        weight="bold"
      >
        {cards.length}
      </Text>
    </div>
  );
};
