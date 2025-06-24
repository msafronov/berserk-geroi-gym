import https from 'https';
import { nanoid } from "nanoid";
import type { Express } from "express";
import type { Request, Response } from "express";

type BerserkdeckData = {
  data: {
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
  
type BerserkdeckResponse = {
  id: string;
  title: string;
  description: string;
  hero: { setNumber: number; cardNumber: number; };
  deck: { setNumber: number; cardNumber: number; }[];
  sideboard: { setNumber: number; cardNumber: number; }[];
};

export const deckImport = (app: Express) => {
  const makeRequest = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        let data = '';
  
        response.on('data', (chunk) => {
          data += chunk;
        });
  
        response.on('error', (error) => {
          reject(error);
        });
  
        response.on('end', () => {
          resolve(data);
        });
      });
    });
  };
  
  const parseBerserkdeckResponse = (response: string): Promise<BerserkdeckResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const {
          data: {
            deckName,
            description,
            hero,
            mainDeck,
            sideboard,
          },
        } = JSON.parse(response) as BerserkdeckData;

        const deckResponse: BerserkdeckResponse['deck'] = [];
        const sideboardResponse: BerserkdeckResponse['sideboard'] = [];

        mainDeck.forEach(({ count , card }) => {
          const cards = new Array(count || 1).fill({
            setNumber: card.setNumber,
            cardNumber: card.number,
          });

          deckResponse.push(...cards);
        });

        sideboard.forEach(({ count, card }) => {
          const cards = new Array(count || 1).fill({
            setNumber: card.setNumber,
            cardNumber: card.number,
          });

          sideboardResponse.push(...cards);
        });

        resolve({
          id: nanoid(),
          title: deckName,
          description: description,
          hero: {
            setNumber: hero.setNumber,
            cardNumber: hero.number,
          },
          deck: deckResponse,
          sideboard: sideboardResponse,
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  
  app.post('/deck-import/v1/import', async (req: Request, res: Response) => {
    let deckId = null;

    try {
      deckId = req.body.id;
    } catch (error) {
      res.status(400);
      res.send('Bad Request');
      return;
    }
  
    if (!/[0-9]{1,6}/.test(deckId)) {
      res.status(400);
      res.send('Bad Request');
      return;
    }
  
    try {
      const berserkDeckResponse = await makeRequest(`https://www.berserkdeck.ru/dev/api/decks/${deckId}?`);
      const result = await parseBerserkdeckResponse(berserkDeckResponse);
  
      res.send(result);
    } catch (error) {
      res.status(500);
      res.send('Internal Server Error');
    }
  });
};
