import { Text } from '@/ui/Text/Text';

import './styles.css';

type Props = {
  onClick: () => void;
};

export const HeroCardEmpty = ({ onClick }: Props) => {
  return (
    <div
      className="start-screen-modal-hero-card-empty"
      onClick={onClick}
    >
      <Text size="sm" color="purple">выберите</Text>
      <Text size="sm" color="purple">колоду</Text>
    </div>
  );
};
