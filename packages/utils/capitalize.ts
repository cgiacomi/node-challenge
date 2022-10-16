export const capitalize = (word?: string): string => {
  if (!word) {
    return word;
  }

  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
};

export const upper = (word?: string): string => {
  if (!word) {
    return word;
  }

  return word.toUpperCase();
};
