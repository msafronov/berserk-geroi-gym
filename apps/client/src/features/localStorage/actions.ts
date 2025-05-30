export const getItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(item) as T;
  }

  return null;
};

export const setItem = <T>(key: string, item: T) => {
  localStorage.setItem(key, JSON.stringify(item));
};
