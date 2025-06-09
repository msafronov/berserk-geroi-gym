import type { IGameTableCard } from '../../../../store';

import { RedCounter } from '../ActiveCardSettingsPanel/components/Counter/RedCounter';
import { GreenCounter } from '../ActiveCardSettingsPanel/components/Counter/GreenCounter';
import { WhiteCounter } from '../ActiveCardSettingsPanel/components/Counter/WhiteCounter';
import { BlackCounter } from '../ActiveCardSettingsPanel/components/Counter/BlackCounter';

import './styles.css';

type Props = {
  card: IGameTableCard;
};

export const CardCounters = ({ card }: Props) => {
  return (
    <div className="game-table-zone-card-counters">
      <div>
        {!!card.counterRed && (
          <RedCounter
            value={card.counterRed}
          />
        )}

        {!!card.counterGreen && (
          <GreenCounter
            value={card.counterGreen}
          />
        )}
      </div>

      <div>
        {!!card.counterWhite && (
          <WhiteCounter
            value={card.counterWhite}
          />
        )}

        {!!card.counterBlack && (
          <BlackCounter
            value={card.counterBlack}
          />
        )}
      </div>
    </div>
  );
};
