export const generateRandomValue = (min: number, max: number, numAfterDigit = 0) =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const getRandomItems = <T>(items: T[], numFixedItem = 0): T[] => {
  const result = [];
  const randomItems = [...items];
  if (numFixedItem === 0) {
    numFixedItem = generateRandomValue(0, items.length);
  }
  for (let i = 0; i < numFixedItem; i += 1) {
    result.push(randomItems.splice(Math.random() * randomItems.length, 1)[0]);
  }
  return result;
};

export const getRandomItem = <T>(items: T[]): T =>
  items[generateRandomValue(0, items.length - 1)];

export const getRandomEnumKey = (items: object) => {
  const values = Object.keys(items);
  return values[generateRandomValue(0, values.length - 1)];
};

export const getRandomEnumKeys = (items: object, numFixedItem = 0) => {
  const result = [];
  const rundomKeys = Object.keys(items);
  if (numFixedItem === 0) {
    numFixedItem = generateRandomValue(0, rundomKeys.length);
  }
  for (let i = 0; i < numFixedItem; i += 1) {
    result.push(rundomKeys.splice(Math.random() * rundomKeys.length, 1)[0]);
  }
  return result;
};
