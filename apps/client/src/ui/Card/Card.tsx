import { useMemo } from 'preact/hooks';

import './styles.css';
import clsx from 'clsx';

type Props = {
  setNumber: number;
  cardNumber: number;
  isFaceDown?: boolean;
  isCoin?: boolean;
  size?: 'lg2';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export const Card = ({
  setNumber,
  cardNumber,
  isFaceDown,
  isCoin,
  size,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  const style = useMemo(() => {
    if (isFaceDown) {
      return {
        backgroundImage: `URL("/img/card-face-down.png")`,
      };
    }

    if (isCoin) {
      return {
        backgroundImage: `URL("/img/card-coin.png")`,
      };
    }

    return {
      backgroundImage: `URL("/img/cards/${setNumber}/${cardNumber}.jpg")`,
    };
  }, [setNumber, cardNumber, isCoin, isFaceDown]);

  return (
    <div
      style={style}
      className={clsx('card', {
        [`card--size--${size}`]: size,
      })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
