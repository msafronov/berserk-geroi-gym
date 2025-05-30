import { useCallback, useEffect, useState } from 'preact/hooks';

import {
  getLastSelectedDeckIdSideA,
  getLastSelectedDeckIdSideB,
} from '@/features/database/actions';
import type { IDatabaseStoreDeck } from '@/features/database/store';

import { openDecksModal } from '@/features/decksModal/actions';

import { Text } from '@/ui/Text/Text';
import { Image } from '@/ui/Image/Image';
import { Button } from '@/ui/Button/Button';

import { HeroCard } from './components/HeroCard/HeroCard';

import './styles.css';
import { closeStartScreenModal } from '../../actions';

export const Decks = () => {
  const [selectedDeckSideA, setSelectedDeckSideA] = useState<IDatabaseStoreDeck | null>(null);
  const [selectedDeckSideB, setSelectedDeckSideB] = useState<IDatabaseStoreDeck | null>(null);

  useEffect(() => {
    setSelectedDeckSideA(getLastSelectedDeckIdSideA());
    setSelectedDeckSideB(getLastSelectedDeckIdSideB());
  }, []);

  const onHeroCardClick = useCallback(() => {
    closeStartScreenModal();
    openDecksModal();
  }, []);

  return (
    <>
      <HeroCard
        onClick={onHeroCardClick}
      />

      <Image
        src="/img/versus.svg"
        marginTop="lg"
        marginBottom="lg"
      />

      <HeroCard
        onClick={onHeroCardClick}
      />

      <Button
        size="md"
        marginTop="lg"
        color="violett"
        disabled={false}
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
