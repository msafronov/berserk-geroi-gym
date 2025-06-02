import clsx from 'clsx';

import './styles.css';

type Props = {
  setNumber: number;
  cardNumber: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export const Card = ({
  setNumber,
  cardNumber,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  return (
    <div
      style={{ backgroundImage: `URL("/img/cards/${setNumber}/${cardNumber}.jpg")` }}
      className={clsx('card')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
