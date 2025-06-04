import { useStore } from '@nanostores/preact';
import { useCallback } from 'preact/hooks';

import { Text } from '@/ui/Text/Text';
import { Button } from '@/ui/Button/Button';

import type { IDeckEditorModalSwitchItem } from '../../store';
import { $deckEditorModalStore } from '../../store';
import { setActiveSwitchItem } from '../../actions';

import './styles.css';

type Props = {
  deckLength: number;
  sideboardLength: number;
};

export const DeckSwitch = ({ deckLength, sideboardLength }: Props) => {
  const { activeSwitchItem } = useStore($deckEditorModalStore);

  const onSwitchButtonClick = useCallback((activeSwitchItem: IDeckEditorModalSwitchItem) => {
    setActiveSwitchItem(activeSwitchItem);
  }, []);

  return (
    <div className="deck-editor-deck-switch">
      <Button
        onClick={() => onSwitchButtonClick('SWITCH_ITEM_DECK')}
        color="white"
        marginRight="md"
      >
        <Text
          color="black"
          weight={activeSwitchItem === 'SWITCH_ITEM_DECK' ? 'bold' : 'light'}
        >
          Колода ({deckLength})
        </Text>
      </Button>

      <Button
        onClick={() => onSwitchButtonClick('SWITCH_ITEM_SIDEBOARD')}
        color="white"
      >
        <Text
          color="black"
          weight={activeSwitchItem === 'SWITCH_ITEM_SIDEBOARD' ? 'bold' : 'light'}
        >
          Сайдборд ({sideboardLength})
        </Text>
      </Button>
    </div>
  )
};
