const path = require('path');
const fs = require('fs');
const https = require('https');

const config = require('./config.json');
const { downloadList } = require('./src/index');

const getCardImageURLRegular = (setNumber: number, cardNumber: number) => {
  return `https://www.berserkdeck.ru/dev/api/images/cards-heroes/${setNumber}/${cardNumber}/regular`;
};

const getCardImageURLPf = (setNumber: number, cardNumber: number) => {
  return `https://www.berserkdeck.ru/dev/api/images/cards-heroes/${setNumber}/${cardNumber}/pf`;
};

const downloadCardImageFile = (cardImageDir: string, cardImageURL: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(cardImageDir);

    // @ts-ignore
    https.get(cardImageURL, (response) => {
      response.pipe(file);

      file.on('error', () => {
        reject();
      });

      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
  });
};

const makePreventAntiBotDelay = (time: number) => {
  return new Promise((resolve) => {
    if (time < 0) {
      resolve(0);
      return;
    }

    const randomTimeMin = Math.round(time / 2);
    const randomTimeMax = time;

    const randomTime = Math.round(Math.random() * (randomTimeMax - randomTimeMin) + randomTimeMin);

    setTimeout(() => {
      resolve(randomTime);
    }, randomTime);
  });
};

const run = async () => {
  console.log(`[+] downloading has started...`);

  const outputDir = path.join(__dirname, config.outputDir);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (let downloadListIndex = 0; downloadListIndex < downloadList.length; downloadListIndex++) {
    const { setNumber, minCardNumber, maxCardNumber, notExistCardNumbers, pfCardNumbers } = downloadList[downloadListIndex];
    const setDir = path.join(outputDir, setNumber.toString());

    if (!fs.existsSync(setDir)) {
      fs.mkdirSync(setDir, { recursive: true });
    }

    for (let cardNumber = minCardNumber; cardNumber <= maxCardNumber; cardNumber++) {
      if (notExistCardNumbers.includes(cardNumber)) {
        console.log(`[+] (SKIPPED) card does not exist -- set number: ${setNumber}, card number: ${cardNumber} of ${maxCardNumber}, prevent anti-bot: 0 ms`);
        continue;
      }

      const cardImageDir = path.join(setDir, `${cardNumber.toString()}.jpg`);

      if (!config.rewriteFiles) {
        if (fs.existsSync(cardImageDir)) {
          console.log(`[+] (SKIPPED) card already exists -- set number: ${setNumber}, card number: ${cardNumber} of ${maxCardNumber}, prevent anti-bot: 0 ms`);
          continue;
        }
      }

      const isPfCard = pfCardNumbers.includes(cardNumber);
      const cardImageURL = isPfCard
        ? getCardImageURLPf(setNumber, cardNumber)
        : getCardImageURLRegular(setNumber, cardNumber);

      const preventAntiBotTime = await makePreventAntiBotDelay(config.preventAntiBotDelayMS);

      await downloadCardImageFile(cardImageDir, cardImageURL);

      console.log(`[+] card image downloaded -- set number: ${setNumber}, card number: ${cardNumber} of ${maxCardNumber}, prevent anti-bot: ${preventAntiBotTime} ms`);
    }
  }
};

run()
  .then(() => {
    console.log('[+] download complete!');
  })
  .catch((error) => {
    console.log('[+] an error occured - terminated:');
    console.log(error);
  });
