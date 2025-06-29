const cardNumberRangeInclusive = (from: number, to: number) => {
  const result = [];

  for (let i = from; i <= to; i++) {
    result.push(i);
  }

  return result;
};

export const downloadList = [
  { title: 'Раммарат', setNumber: 23, minCardNumber: 1, maxCardNumber: 207, notExistCardNumbers: [], pfCardNumbers: [...cardNumberRangeInclusive(193, 207)] },

  { title: 'Обучающий Набор 2025', setNumber: 22, minCardNumber: 1, maxCardNumber: 74, notExistCardNumbers: [...cardNumberRangeInclusive(45, 67), 69], pfCardNumbers: [68, 70] },

  { title: 'Золотой Век', setNumber: 21, minCardNumber: 1, maxCardNumber: 234, notExistCardNumbers: [], pfCardNumbers: [190, ...cardNumberRangeInclusive(196, 200), ...cardNumberRangeInclusive(203, 234)] },

  { title: 'Большая Игра', setNumber: 19, minCardNumber: 1, maxCardNumber: 38, notExistCardNumbers: [], pfCardNumbers: [4, 14, 32, 37, 38] },

  { title: 'Огни Большого Города', setNumber: 18, minCardNumber: 1, maxCardNumber: 229, notExistCardNumbers: [196], pfCardNumbers: [...cardNumberRangeInclusive(190, 194), ...cardNumberRangeInclusive(196, 229)] },

  { title: 'Переполох в Канор-Вейне', setNumber: 17, minCardNumber: 1, maxCardNumber: 197, notExistCardNumbers: [], pfCardNumbers: [...cardNumberRangeInclusive(192, 196)] },

  { title: 'Ветер Перемен', setNumber: 16, minCardNumber: 1, maxCardNumber: 225, notExistCardNumbers: [], pfCardNumbers: [...cardNumberRangeInclusive(194, 224)] },

  { title: 'Возвращение Древних', setNumber: 15, minCardNumber: 1, maxCardNumber: 197, notExistCardNumbers: [], pfCardNumbers: [] },

  { title: 'Пробуждение Драконов', setNumber: 14, minCardNumber: 1, maxCardNumber: 192, notExistCardNumbers: [], pfCardNumbers: [] },
];
