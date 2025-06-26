import { nanoid } from "nanoid";

import type { IDatabaseStoreDeck } from "@/features/database/store";

type BerserkdeckDeck = {
  data: {
    id: number;
    deckName: string;
    description: string;
    hero: { setNumber: number; number: number };
    mainDeck: {
      count: number;
      card: { setNumber: number; number: number };
    }[];
    sideboard: {
      count: number;
      card: { setNumber: number; number: number };
    }[];
  },
};

export const mapBerserkdeckDeckToDatabaseStoreDeck = (mapBerserkdeckDeck: BerserkdeckDeck): Promise<IDatabaseStoreDeck> => {
  return new Promise((resolve, reject) => {
    try {
      const {
        data: {
          id,
          hero,
          mainDeck,
          sideboard,
        },
      } = mapBerserkdeckDeck;

      const databaseStoreDeck: IDatabaseStoreDeck['deck'] = [];
      const databaseStoreDeckSideboard: IDatabaseStoreDeck['sideboard'] = [];

      mainDeck.forEach(({ count , card }) => {
        const cards = new Array(count || 1).fill({
          setNumber: card.setNumber,
          cardNumber: card.number,
        });

        databaseStoreDeck.push(...cards);
      });

      sideboard.forEach(({ count, card }) => {
        const cards = new Array(count || 1).fill({
          setNumber: card.setNumber,
          cardNumber: card.number,
        });

        databaseStoreDeckSideboard.push(...cards);
      });

      resolve({
        id: nanoid(),
        title: id.toString(),
        description: '',
        hero: {
          setNumber: hero.setNumber,
          cardNumber: hero.number,
        },
        deck: databaseStoreDeck,
        sideboard: databaseStoreDeckSideboard,
      });
    } catch (error) {
      reject(error);
    }
  });
};
