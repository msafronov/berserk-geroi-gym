import { Text } from '@/ui/Text/Text';

import './styles.css';

type Props = {
  onClick: () => void;
};

export const HeroCard = ({ onClick }: Props) => {
  return (
    <div
      className="start-screen-modal-hero-card"
      onClick={onClick}
    >
      <Text size="sm" color="purple">выберите</Text>
      <Text size="sm" color="purple">колоду</Text>
    </div>
  );
};
