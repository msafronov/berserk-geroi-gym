import clsx from 'clsx';

import './styles.css';

type Props = {
  image: 'telegram' | 'github';
  onClick?: () => void;
};

export const Icon = ({ image, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={clsx('icon', {
        [`icon--clickable`]: onClick,
        [`icon--image--${image}`]: image,
      })}
    />
  );
};
