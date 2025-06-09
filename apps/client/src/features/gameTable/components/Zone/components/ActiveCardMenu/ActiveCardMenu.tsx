import { useCallback, useEffect, useState } from 'preact/hooks';

import { Button } from '@/ui/Button/Button';
import { Icon } from '@/ui/Icon/Icon';

import type { IGameTableCard } from '../../../../store';

import { Wrapper } from './components/Wrapper/Wrapper';
import { MenuButton } from './components/MenuButton/MenuButton';

import { DeckActiveCardMenuItems } from './DeckActiveCardMenuItems';
import { GraveyardActiveCardMenuItems } from './GraveyardActiveCardMenuItems';
import { HandActiveCardMenuItems } from './HandActiveCardMenuItems';
import { QuestsActiveCardMenuItems } from './QuestsActiveCardMenuItems';

type Props = {
  card: IGameTableCard;
};

export const ActiveCardMenu = ({ card }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [card.id]);

  const onOpenMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const isDeck = card.zone === 'deckTop' || card.zone === 'deckBottom';
  const isHand = card.zone === 'handTop' || card.zone === 'handBottom';
  const isGraveyard = card.zone === 'graveyardTop' || card.zone === 'graveyardBottom';
  const isQuests = card.zone === 'questsTop' || card.zone === 'questsBottom';

  const isVisible = isDeck || isHand || isGraveyard || isQuests;

  if (!isVisible) {
    return null;
  }

  if (!isMenuOpen) {
    return (
      <Wrapper>
        <MenuButton>
          <Button
            color="white"
            padding="sm2"
            onClick={onOpenMenu}
          >
            <Icon image="dots-vertical" size="sm" />
          </Button>
        </MenuButton>
      </Wrapper>
    );
  }

  if (isDeck) {
    return (
      <Wrapper>
        <DeckActiveCardMenuItems card={card} />
      </Wrapper>
    );
  }

  if (isHand) {
    return (
      <Wrapper>
        <HandActiveCardMenuItems card={card} />
      </Wrapper>
    );
  }

  if (isGraveyard) {
    return (
      <Wrapper>
        <GraveyardActiveCardMenuItems card={card} />
      </Wrapper>
    );
  }

  if (isQuests) {
    return (
      <Wrapper>
        <QuestsActiveCardMenuItems card={card} />
      </Wrapper>
    );
  }

  return null;
};
