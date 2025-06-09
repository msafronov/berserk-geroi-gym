import clsx from 'clsx';

import './styles.css';

type Props = {
  image:
    | 'telegram'
    | 'github'
    | 'close-card'
    | 'open-card'
    | 'dots-vertical'
    | 'close'
    | 'arrow-left'
    | 'arrow-right';
  size?: 'sm' | 'md';
  onClick?: () => void;
};

export const Icon = ({ image, size = 'md', onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={clsx('icon', {
        [`icon--clickable`]: onClick,
        [`icon--image--${image}`]: image,
        [`icon--size--${size}`]: size,
      })}
    />
  );
};
