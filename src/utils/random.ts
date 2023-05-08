export const generateRandomValue = (min:number, max: number, numAfterDigit = 0) =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const getRandomItems = <T>(items: T[]):T[] => {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
};

export const getRandomFixItems = <T>(items: T[], count:number):T[] => {
  const startPosition = generateRandomValue(0, items.length - count - 1);
  const endPosition = startPosition + count;
  return items.slice(startPosition, endPosition);
};

export const getRandomItem = <T>(items: T[]):T =>
  items[generateRandomValue(0, items.length - 1)];

export const getRandomEnumKey = (items:object) => {
  const values = Object.keys(items);
  return values[generateRandomValue(0, values.length - 1)];
};

export const getRandomEnumKeys = (items:object) => {
  const values = Object.keys(items);
  const startPosition = generateRandomValue(0, values.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, values.length);
  return values.slice(startPosition, endPosition);
};
