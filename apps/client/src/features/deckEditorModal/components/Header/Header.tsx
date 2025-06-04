import { Text } from '@/ui/Text/Text';

import './styles.css';

type Props = {
  isCreation: boolean;
};

export const Header = ({ isCreation }: Props) => {
  return (
    <div className="deck-editor-header">
      {
        isCreation
          ? (
            <Text
              size="lg"
              weight="bold"
            >
              Редактирование созданной колоды
            </Text>
          )
          : (
            <Text
              size="lg"
              weight="bold"
            >
              Редактирование колоды
            </Text>
          )
      }
    </div>
  )
};
