import { useStore } from '@nanostores/preact';
import { useCallback, useEffect, useState } from 'preact/hooks';

import type { IDatabaseStoreCard } from '@/features/database/store';
import { $databaseStore } from '@/features/database/store';

import { openDecksModal } from '@/features/decksModal/actions';

import { Text } from '@/ui/Text/Text';
import { Image } from '@/ui/Image/Image';
import { Button } from '@/ui/Button/Button';

import { closeStartScreenModal } from '../../actions';
import { HeroCard } from './components/HeroCard/HeroCard';
import { HeroCardEmpty } from './components/HeroCardEmpty/HeroCardEmpty';

import './styles.css';

export const Decks = () => {
  const [selectedDeckTop, setSelectedDeckTop] = useState<IDatabaseStoreCard | null>(null);
  const [selectedDeckBottom, setSelectedDeckBottom] = useState<IDatabaseStoreCard | null>(null);

  const {
    decks,
    settings: {
      lastSelectedDeckIdTop,
      lastSelectedDeckIdBottom,
    },
  } = useStore($databaseStore);

  useEffect(() => {
    setSelectedDeckTop(decks[lastSelectedDeckIdTop]?.hero || null);
    setSelectedDeckBottom(decks[lastSelectedDeckIdBottom]?.hero || null);
  }, []);

  const onHeroCardClick = useCallback(() => {
    closeStartScreenModal();
    openDecksModal();
  }, []);

  return (
    <>
      {
        selectedDeckTop
          ? (
            <HeroCard
              setNumber={selectedDeckTop.setNumber}
              cardNumber={selectedDeckTop.cardNumber}
              isTopDeck={true}
              onClick={onHeroCardClick}
            />
          )
          : (
            <HeroCardEmpty
              onClick={onHeroCardClick}
            />
          )
      }

      <Image
        src="/img/versus.svg"
        marginTop="lg"
        marginBottom="lg"
      />

      {
        selectedDeckBottom
          ? (
            <HeroCard
              setNumber={selectedDeckBottom.setNumber}
              cardNumber={selectedDeckBottom.cardNumber}
              isBottomDeck={true}
              onClick={onHeroCardClick}
            />
          )
          : (
            <HeroCardEmpty
              onClick={onHeroCardClick}
            />
          )
      }

      <Button
        size="md"
        marginTop="lg"
        color="violett"
        disabled={false}
        onClick={() => {}}
      >
        <Text
          color="white"
          weight="bold"
        >
          Начать!
        </Text>
      </Button>
    </>
  );
};
