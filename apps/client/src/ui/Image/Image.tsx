import clsx from 'clsx';

import './styles.css';

type Props = {
  src: string;
  alt?: string;
  marginTop?: 'lg';
  marginBottom?: 'lg';
};

export const Image = ({ src, alt, marginTop, marginBottom }: Props) => {
  return (
    <img
      className={clsx('img', {
        [`image--margin-top--${marginTop}`]: marginTop,
        [`image--margin-bottom--${marginBottom}`]: marginBottom,
      })}
      src={src}
      alt={alt}
    />
  );
};
