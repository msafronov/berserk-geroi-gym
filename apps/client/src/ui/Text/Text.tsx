import clsx from 'clsx';

import './styles.css';

type Props = {
  tag?: 'span';
  size?: 'sm' | 'md' | 'lg';
  color?: 'black' | 'white' | 'purple' | 'violett' | 'red' | 'blue';
  weight?: 'light' | 'bold';
  style?: 'normal' | 'italic';
  children: string | number;
};

export const Text = ({
  tag = 'span',
  size = 'md',
  color,
  weight = 'light',
  style,
  children,
}: Props) => {
  const Tag = tag;

  return (
    <Tag
      className={clsx('text', {
        [`text--size--${size}`]: size,
        [`text--color--${color}`]: color,
        [`text--weight--${weight}`]: weight,
        [`text--style--${style}`]: style,
      })}
    >
      {children}
    </Tag>
  );
};
