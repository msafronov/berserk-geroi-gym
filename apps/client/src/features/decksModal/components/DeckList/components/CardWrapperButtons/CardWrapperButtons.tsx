import type { JSX } from 'preact/jsx-runtime';
import { useCallback, useState } from 'preact/hooks';

import './styles.css';

type Props = {
  children: JSX.Element[];
};

export const CardWrapperButtons = ({ children }: Props) => {
  const [isButtonsVisible, setIsButtonsVisible] = useState<boolean>(false);

  const onButtonsMouseEnter = useCallback(() => {
    setIsButtonsVisible(true);
  }, []);

  const onButtonsMouseLeave = useCallback(() => {
    setIsButtonsVisible(false);
  }, []);

  return (
    <div
      className="decks-card-wrapper-buttons"
      onMouseEnter={onButtonsMouseEnter}
      onMouseLeave={onButtonsMouseLeave}
    >
      {
        isButtonsVisible
          ? children
          : null
      }
    </div>
  )
};
