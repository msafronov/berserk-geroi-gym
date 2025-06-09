import clsx from 'clsx';
import type { JSX } from 'preact/jsx-runtime';

import { Card } from '@/ui/Card/Card';

import type { IGameTableCard } from '../../store';

import './styles.css';

type Props = {
  card: IGameTableCard;
  order: number;
  position?: 'absolute';
  isFaceDownForce?: boolean;
  children?: JSX.Element | JSX.Element[] | null;
};

export const DraggableZoneCard = ({ card, order, position, isFaceDownForce, children }: Props) => {
  return (
    <div
      data-object-id="card"
      data-object-value={card.id}
      data-object-order={order}
      className={clsx('game-table-zone-draggable-zone-card', {
        'game-table-zone-draggable-zone-card--active': card.isActive,
        [`game-table-zone-draggable-zone-card--position--${position}`]: position,
      })}
      style={
        position === 'absolute'
          ? { transform: `translate(${card.x}px, ${card.y}px)${card.isClosed ? ' rotate(90deg)' : ''}` }
          : undefined
      }
      draggable={true}
    >
      <Card
        setNumber={card.setNumber}
        cardNumber={card.cardNumber}
        isFaceDown={isFaceDownForce === undefined ? card.isFaceDown : isFaceDownForce}
        isCoin={card.type === 'coin'}
      />

      {children}
    </div>
  );
};
