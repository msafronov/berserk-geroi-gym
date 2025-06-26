import https from 'https';
import type { Express } from "express";
import type { Request, Response } from "express";

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

  app.get('/deck-import/:id', async (req: Request, res: Response) => {
    const deckId = req.params?.id;

    if (!/[0-9]{1,6}/.test(deckId)) {
      res.status(400);
      res.send('Bad Request');
      return;
    }

    try {
      const berserkDeckResponse = await makeRequest(`https://www.berserkdeck.ru/dev/api/decks/${deckId}?`);
  
      res.send(berserkDeckResponse);
    } catch (error) {
      res.status(500);
      res.send('Internal Server Error');
    }
  });
};
