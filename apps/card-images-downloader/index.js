const path = require('path');
const fs = require('fs');
const https = require('https');

const config = require('./config.json');

const cardNumberRangeInclusive = (from, to) => {
  const result = [];

  for (let i = from; i <= to; i++) {
    result.push(i);
  }

  return result;
};

const downloadList = [
  // пробуждение драконов
  { setNumber: 14, minCardNumber: 1, maxCardNumber: 192, notExistCardNumbers: [], pfCardNumbers: [] },

  // возвращение древних
  { setNumber: 15, minCardNumber: 1, maxCardNumber: 197, notExistCardNumbers: [], pfCardNumbers: [] },

  // ветер перемен
  { setNumber: 16, minCardNumber: 1, maxCardNumber: 225, notExistCardNumbers: [], pfCardNumbers: [...cardNumberRangeInclusive(194, 224)] },

  // переполох в канор-вейне
  { setNumber: 17, minCardNumber: 1, maxCardNumber: 197, notExistCardNumbers: [], pfCardNumbers: [...cardNumberRangeInclusive(192, 196)] },

  // огни большого города
  { setNumber: 18, minCardNumber: 1, maxCardNumber: 229, notExistCardNumbers: [196], pfCardNumbers: [...cardNumberRangeInclusive(190, 194), ...cardNumberRangeInclusive(196, 229)] },

  // большая игра
  { setNumber: 19, minCardNumber: 1, maxCardNumber: 38, notExistCardNumbers: [], pfCardNumbers: [4, 14, 32, 37, 38] },

  // золотой век
  { setNumber: 21, minCardNumber: 1, maxCardNumber: 234, notExistCardNumbers: [205, 206, 207, 208, 211, 213, 214, 215, 216, 221, 225, 226], pfCardNumbers: [190, ...cardNumberRangeInclusive(196, 200), ...cardNumberRangeInclusive(203, 234)] },

  // обучающий набор 2025
  { setNumber: 22, minCardNumber: 1, maxCardNumber: 74, notExistCardNumbers: [...cardNumberRangeInclusive(45, 67), 69], pfCardNumbers: [68, 70] },

  // раммарат
  // { setNumber: 23, minCardNumber: 1, maxCardNumber: 207, notExistCardNumbers: [], pfCardNumbers: [] },
];

const getCardImageURLRegular = (setNumber, cardNumber) => {
  return `https://www.berserkdeck.ru/dev/api/images/cards-heroes/${setNumber}/${cardNumber}/regular`;
};

const getCardImageURLPf = (setNumber, cardNumber) => {
  return `https://www.berserkdeck.ru/dev/api/images/cards-heroes/${setNumber}/${cardNumber}/pf`;
};

const downloadCardImageFile = (cardImageDir, cardImageURL) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(cardImageDir);

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

const makePreventAntiBotDelay = (time) => {
  return new Promise((resolve) => {
    if (time < 0) {
      resolve(0);
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
