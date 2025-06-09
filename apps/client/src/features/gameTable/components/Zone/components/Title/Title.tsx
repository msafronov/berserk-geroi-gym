import type { JSX } from 'preact/jsx-runtime';
import { useMemo } from 'preact/hooks';

import { Text } from '@/ui/Text/Text';

import type { ZoneType } from '../../../../store';

import { AdditionalInfo } from './AdditionalInfo/AdditionalInfo';

import './styles.css';

type Props = {
  zoneType: ZoneType;
  isActive: boolean;
  children?: JSX.Element | JSX.Element[];
};

export const Title = ({ zoneType, isActive, children }: Props) => {
  const title = useMemo(() => {
    if (zoneType === 'handTop' || zoneType === 'handBottom') {
      return 'Рука';
    }

    if (zoneType === 'deckTop' || zoneType === 'deckBottom') {
      return 'Колода';
    }

    if (zoneType === 'graveyardTop' || zoneType === 'graveyardBottom') {
      return 'Кладбище';
    }

    if (zoneType === 'questsTop' || zoneType === 'questsBottom') {
      return 'Квесты';
    }

    if (zoneType === 'sideboardTop' || zoneType === 'sideboardBottom') {
      return 'Сайдборд';
    }

    return '';
  }, [zoneType]);

  return (
    <div className="game-table-zone-title">
      <Text
        weight={isActive ? 'bold' : 'light'}
      >
        {title}
      </Text>

      {
        children
          ? (
            <AdditionalInfo>
              {children}
            </AdditionalInfo>
          )
          : null
      }
    </div>
  );
};
