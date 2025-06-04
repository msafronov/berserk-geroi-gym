import type { JSX } from 'preact/jsx-runtime';
import clsx from 'clsx';

import './styles.css';

type Props = {
  tag?: 'span';
  size?: 'sm' | 'md' | 'lg';
  color?: 'black' | 'white' | 'purple' | 'violett' | 'red' | 'blue';
  weight?: 'light' | 'bold';
  style?: 'normal' | 'italic';
  overflow?: 'elipsis';
  children: (string | number | JSX.Element) | (string | number | JSX.Element)[];
};

export const Text = ({
  tag = 'span',
  size = 'md',
  color,
  weight = 'light',
  style,
  overflow,
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
        [`text--overflow--${overflow}`]: overflow,
      })}
    >
      {children}
    </Tag>
  );
};
