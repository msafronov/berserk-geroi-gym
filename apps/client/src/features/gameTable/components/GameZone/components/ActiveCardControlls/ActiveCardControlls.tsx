import { useCallback } from 'preact/hooks';

import { Button } from '@/ui/Button/Button';
import { Icon } from '@/ui/Icon/Icon';

import type { IGameTableCard } from '../../../../store';
import { toggleOpenCloseActiveCard } from '../../../../actions';

import './styles.css';

type Props = {
  card: IGameTableCard;
}

export const ActiveCardControlls = ({ card }: Props) => {
  const onClick = useCallback(() => {
    toggleOpenCloseActiveCard();
  }, []);

  return (
    <div
      className="game-table-zone-active-card-controls"
    >
      {card.isActive && (
        <Button color="white" onClick={onClick}>
          {
            card.isClosed
              ? <Icon image="open-card" />
              : <Icon image="close-card" />
          }
        </Button>
      )}
    </div>
  );
};
